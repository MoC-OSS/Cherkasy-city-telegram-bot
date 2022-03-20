/**
 * @typedef { import("knex").knex } knex
 */

module.exports = class Jobs {
  /**
   * @param {knex} knex
   */
  constructor(knex) {
    this.client = knex;
  }

  /**
   * @param {number} creatorId
   */
  async create(creatorId) {
    const [job] = await this.client('jobs')
      .insert({
        creator_id: creatorId,
      })
      .returning('*');
    return job;
  }

  /**
   * @param {string} id
   */
  async getById(id) {
    const [job] = await this.client('jobs').select('*').where({
      id,
    });
    return job;
  }

  /**
   * @param {number} id
   * @param {any} data
   */
  async setValueById(id, data) {
    return this.client('jobs')
      .where({
        id,
      })
      .update(data);
  }
};
