const checkSubPlan = (subscriptionEndDate) => {
  if (subscriptionEndDate == undefined || new Date() > subscriptionEndDate) {
    return true;
  }
  return false;
};

export default checkSubPlan;
