import { Form, Input, Button, Select, SelectItem } from "@heroui/react";

import { getUserId } from "@/app/lib/auth/auth";
import { createBudgetService } from "@/app/lib/services/plannerServices";

export default function AddBudgetForm() {
  async function createBudget(formData: FormData) {
    const userId = Number(await getUserId());
    const budget = await createBudgetService({
      user_id: userId,
      expense_category: formData.get("Expense Category") as
        | "health"
        | "food"
        | "education"
        | "housing"
        | "transport"
        | "entertaiment"
        | "utilities"
        | "other",
      budget_amount: Number(formData.get("Budget Amount")),
      period_start: formData.get("Period Start") as string,
      period_end: formData.get("Period End") as string,
    });
    if (budget.message === "Budget created successfully") {
      console.log("Budget created successfully");
    } else {
      console.log("Budget creation failed");
    }
  }
  return (
    <Form action={createBudget}>
      <Select
        label="Expense Category"
        placeholder="Select a category for your budget"
      >
        <SelectItem key="health">Health</SelectItem>
        <SelectItem key="food">Food</SelectItem>
        <SelectItem key="education">Education</SelectItem>
        <SelectItem key="housing">Housing</SelectItem>
        <SelectItem key="transport">Transport</SelectItem>
        <SelectItem key="entertaiment">Entertaiment</SelectItem>
        <SelectItem key="utilities">Utilities</SelectItem>
        <SelectItem key="other">Other</SelectItem>
      </Select>
      <Input
        label="Budget Amount"
        placeholder="Enter the amount for your budget"
      />
      <Input
        label="Period Start"
        placeholder="Enter the start date for your budget"
      />
      <Input
        label="Period End"
        placeholder="Enter the end date for your budget"
      />
      <Button type="submit">Add Budget</Button>
    </Form>
  );
}
