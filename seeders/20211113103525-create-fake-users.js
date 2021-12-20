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
    await queryInterface.bulkInsert('users',
    [
      {
          email: 'az@mail.com',
          first_name: 'A',
          last_name: 'Z',
          password: '$2b$10$QXT8T0ip.wagsfZiSIASGuE6j.JZty7gvxj67MM/nMl0/.cfq4mNa',
          color: 'yellow',
          animal: 'walrus',
          role: 'admin',
          updatedAt: "2021-12-20T14:40:43.387Z",
          createdAt: "2021-12-20T14:40:43.387Z"
      },
      {
        email: "ae@mail.com",
        first_name: "A",
        last_name: "E",
        password: "$2b$10$VMS1pLsrXuS/pvSN/1RFl.O12Pa6q95gsbgJK5IuPkUl2TMcgPwYK",
        color: "yellow",
        animal: "rabbit",
        role: "user",
        updatedAt: "2021-12-20T14:44:00.009Z",
        createdAt: "2021-12-20T14:44:00.009Z"
      }
    ], {});
    await queryInterface.bulkInsert('collections', [
      {
        private: true,
        name: 'AZ collection',
        userId: 1,
        createdAt: "2021-12-20T15:00:47.373Z",
        updatedAt: "2021-12-20T15:00:47.373Z"
      },
      {
        private: false,
        name: 'AE collection',
        userId: 2,
        createdAt: "2021-12-20T15:00:47.373Z",
        updatedAt: "2021-12-20T15:00:47.373Z"
      },
    ], {});
    await queryInterface.bulkInsert('cards', [
      {
        name: 'string1',
        material: 'text1',
        collectionId: 1,
        createdAt: "2021-12-20T15:16:15.108Z",
        updatedAt: "2021-12-20T15:16:15.108Z"
      },
      {
        name: 'string2',
        material: 'text2',
        collectionId: 1,
        createdAt: "2021-12-20T15:16:15.108Z",
        updatedAt: "2021-12-20T15:16:15.108Z"
      },
      {
        name: 'string3',
        material: 'text3',
        collectionId: 2,
        createdAt: "2021-12-20T15:16:15.108Z",
        updatedAt: "2021-12-20T15:16:15.108Z"
      },
      {
        name: 'string4',
        material: 'text4',
        collectionId: 2,
        createdAt: "2021-12-20T15:16:15.108Z",
        updatedAt: "2021-12-20T15:16:15.108Z"
      }
    ], {});
    await queryInterface.bulkInsert('editors', [
      {
        collectionId: 1,
        userId: 2,
        createdAt: "2021-12-20T15:30:23.379Z",
        updatedAt: "2021-12-20T15:30:23.379Z"
      }
    ],{});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
      await queryInterface.bulkDelete('users', null, {});
      await queryInterface.bulkDelete('collections',null,{});
      await queryInterface.bulkDelete('cards',null,{});
      await queryInterface.bulkDelete('editors',null,{});
  }
};
