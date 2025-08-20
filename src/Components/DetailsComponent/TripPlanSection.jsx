import React from 'react';

const TripPlanSection = ({ tripPlan }) => {
  return (
    <div className="flex flex-col gap-5">
      <h3 className="text-xl font-bold text-[#0F1416]">Trip Plan</h3>
      {tripPlan?.map((plan, index) => (
        <div key={index} className="border-l border-[#FDEFEA] pl-5 ml-4">
          <div className="text-lg font-medium">{plan.title}</div>
          <p className="text-sm">{plan.body}</p>
          <div className="text-xs text-[#475467]">
            <span>{plan.time} minutes</span>. <span>Admission Ticket {plan.fee}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TripPlanSection;
