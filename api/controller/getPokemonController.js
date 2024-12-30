const { StatusCodes } = require('http-status-codes');
const mongoose = require('mongoose');

module.exports = {
  getPokemonList: async (req, res) => {
    try {
      const Pokemon = mongoose.connection.db.collection('PokemonList');
      const requestParams = req.query;
console.log(requestParams.per_page)
      // Pagination parameters
      const limit =
        requestParams.per_page && requestParams.per_page > 0
          ? parseInt(requestParams.per_page, 10)
          : 10;

      const pageNo =
        requestParams.page && requestParams.page > 0
          ? parseInt(requestParams.page, 10)
          : 1;

      const skip = (pageNo - 1) * limit;

      // Sorting parameters
      const sorting = {};
      if (requestParams.order_by) {
        sorting[requestParams.order_by] = requestParams.direction === 'ASC' ? 1 : -1;
      } else {
        sorting.updatedAt = -1; // Default sorting
      }

      // Query filters
      const query = {};
      if (requestParams.name) {
        query.name = { $regex: requestParams.name, $options: 'i' }; // Case-insensitive search
      }
      if (requestParams.abilities) {
        query.abilities = { $regex: requestParams.abilities, $options: 'i' }; // Case-insensitive search
      }

      if (requestParams.search) {
        query.$or = [
          { name: { $regex: requestParams.search, $options: 'i' } },
          { abilities: { $regex: requestParams.search, $options: 'i' } }
        ];
      }


      if (requestParams.sort_by) {
        const validSortFields = ['name', 'height', 'weight'];
        if (validSortFields.includes(requestParams.sort_by)) {
          sorting[requestParams.sort_by] = requestParams.direction === 'ASC' ? 1 : -1;
        }
      } else {
        sorting.updatedAt = -1; // Default sorting by updatedAt
      }
      // Fetch data with Mongoose
      const [rawData, total] = await Promise.all([
        Pokemon.find(query)
          .sort(sorting)
          .skip(skip)
          .limit(limit)
          .toArray(), // Convert cursor to array
        Pokemon.countDocuments(query),
      ]);

      // Prepare response data
      const data = rawData.map((doc) => ({
        ...doc,
        _id: doc._id.toString(), // Ensure the `_id` is serialized
      }));

      // Response payload
      const response = {
        data,
        meta: {
          per_page: limit,
          total,
          page: pageNo,
        },
      };

      return res.status(StatusCodes.OK).json({
        success: true,
        message: 'Success',
        ...response,
      });
    } catch (error) {
      console.error(error);
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: 'Server error',
      });
    }
  },
};
