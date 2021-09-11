import React from "react";
import AvaliableMeals from "./AvailableMeals";
import MealsSummary from "./MealsSummary"

const Meals = () => {
    return <React.Fragment>
        <MealsSummary />
        <AvaliableMeals />
    </React.Fragment>
}
export default Meals;