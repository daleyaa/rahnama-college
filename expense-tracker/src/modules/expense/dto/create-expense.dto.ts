import z from "zod";

export const createExpenseDto = z.object({
  title: z.string().nonempty(),
  groupId: z.string().nonempty(),
  expense: z.number().gt(0),
  payerId: z.string().nonempty()
});
export type CreateExpenseDto = z.infer<typeof createExpenseDto>;