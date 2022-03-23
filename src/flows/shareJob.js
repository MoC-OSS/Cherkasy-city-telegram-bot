const { Router } = require('@grammyjs/router');

const constants = require('../constants');
const handlers = require('../handlers');

const router = new Router((ctx) => ctx.session.step);

router.route(constants.steps.componyName, handlers.shareJob.componyName);
router.route(constants.steps.settlement, handlers.shareJob.settlement);
router.route(constants.steps.jobName, handlers.shareJob.jobName);
router.route(constants.steps.jobDescription, handlers.shareJob.jobDescription);
router.route(constants.steps.jobSalary, handlers.shareJob.jobSalary);
router.route(constants.steps.contactData, handlers.shareJob.contactData);

module.exports = router;
