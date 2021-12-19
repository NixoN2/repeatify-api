'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('users', [{
      first_name: "Andrew",
      last_name: "Zhukov",
      email: "andrewzhukovweb@gmail.com",
      password: "Svz300513a",
      role: "admin",
      animal: "walrus",
      color: "#FF0044",
      createdAt: '2021-11-13T09:51:03.426Z',
      updatedAt: '2021-11-13T10:34:17.875Z',
    },{
      first_name: "Alex",
      last_name: "Egorov",
      role: "user",
      password: "skel",
      animal: "beaver",
      color: "#006CFE",
      email: "skelantros@skel.com",
      createdAt: '2021-11-13T09:51:03.426Z',
      updatedAt: '2021-11-13T10:34:17.875Z'
  }], {});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
      await queryInterface.bulkDelete('users', null, {});
  }
};
