'use client'
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    RadioGroup, 
    Radio,
    Input,
    Divider,
    Select, 
    SelectItem,
    ModalProps
  } from "@heroui/react";

import { fetchAccounts } from "@/app/lib/services/accountsServices";
import { createTransactionService } from "@/app/lib/services/transactionsServices";
import { Account } from "@/app/lib/db/schemas/accountSchemas";
import { useUser } from "@/app/context/sessionDataProvider";
import { useDashboard } from "@/app/context/dashboardContext";
import { useEffect, useState } from "react";
import { expenseCategories, incomeCategories } from "@/app/lib/db/schemas/categoryEnums";

interface BaseModalProps extends ModalProps {
    isOpen: boolean;
    onOpenChangeAction: (open: boolean) => void;
    onCloseAction: () => void;
} 

export default function AddTransactionModal({
    onOpenChangeAction, 
    isOpen, 
    onCloseAction,
} : BaseModalProps )  {
    const [accounts, setAccounts] = useState<Account[]>([]);
    const user = useUser();
    const { refreshDashboard } = useDashboard();
    const [transactionType, setTransactionType] = useState<"Expense" | "Income">("Expense");
    const [selectedAccount, setSelectedAccount] = useState<string>("");
    const [selectedCategory, setSelectedCategory] = useState<string>("");
    const [amount, setAmount] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [transaction_date, setTransactionDate] = useState<string>(new Date().toISOString().split('T')[0]);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        const getAccounts = async () => {
            try {
                const accounts = await fetchAccounts(user.sessionUser.user_id);
                if (accounts.length === 0) {
                    console.log('No accounts found');
                    setAccounts([]);
                } else {
                    setAccounts(accounts.map(account => ({
                        ...account,
                        created_at: new Date(account.created_at).toISOString().split('T')[0]
                    })));
                }
            } catch (error) {
                console.error('Failed to fetch accounts:', error);
            }
        };
        getAccounts();
    }, [user.sessionUser.user_id]);

    const handleSubmit = async () => {
        if (!selectedAccount || !selectedCategory || !amount) {
            alert('Please fill in all required fields');
            return;
        }

        setIsSubmitting(true);
        try {
            const accountId = parseInt(selectedAccount);
            const amountValue = parseFloat(amount);
            
            if (isNaN(accountId) || isNaN(amountValue)) {
                alert('Invalid account or amount');
                return;
            }

            const transactionData = {
                user_id: user.sessionUser.user_id,
                account_id: accountId,
                amount: amountValue,
                transaction_type: transactionType,
                description: description || undefined,
                transaction_date: transaction_date,
                ...(transactionType === 'Income' 
                    ? { income_category: selectedCategory as "Other" | "Salary" | "Extra Work" | "Investments" | "Gifts" | "Other"}
                    : { expense_category: selectedCategory as "Health" | "Food" | "Education" | "Housing" | "Transport" | "Entertainment" | "Utilities" | "Other"}
                )
            };
            console.log('transactionData', transactionData)

            const result = await createTransactionService(transactionData);
            
            if (result.message.includes('successfully')) {
                alert('Transaction created successfully!');
                refreshDashboard(); // Refresh dashboard data
                onCloseAction();
                // Reset form
                setAmount("");
                setDescription("");
                setSelectedAccount("");
                setSelectedCategory("");
                setTransactionType("Expense");
                onCloseAction();
                // You might want to refresh the transactions list here
            } else {
                alert(result.message);
                onCloseAction();
                setAmount("");
                setDescription("");
                setSelectedAccount("");
                setSelectedCategory("");
                setTransactionType("Expense");
            }
        } catch (error) {
            console.error('Failed to create transaction:', error);
            alert('Failed to create transaction');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChangeAction}
        onClose={onCloseAction}
        placement="bottom"
        >
            <ModalContent>
                {(onCloseAction) => (
                    <> 
                    <ModalHeader>
                        Add Transaction
                    </ModalHeader>
                    <Divider className="my-2"></Divider>
                    <ModalBody>
                                    <RadioGroup
                                    className="border-1 border-gray-500 rounded-lg p-2 flex justify-between w-full"
                                    size="lg"
                                    name="Transaction-Type"
                                    isRequired
                                    orientation="horizontal"
                                    label="Transaction Type"
                                    value={transactionType}
                                    onValueChange={(value) => {
                                        setTransactionType(value as "Expense" | "Income");
                                        setSelectedCategory(""); // Reset category when type changes
                                    }}
                                    >
                                        <Radio className="w-full text-center" 
                                        value="Expense"
                                        size="lg"
                                        color="danger">
                                            Expense
                                        </Radio>
                                        <Radio 
                                        className="w-full text-center"
                                        color="primary"
                                        size="lg"
                                        value="Income"
                                        > 
                                            <strong className="text-xl">Income</strong></Radio>
                                    </RadioGroup>
                                    <Input
                                    label='Amount'
                                    placeholder="0.00"
                                    startContent={<p className="text-primary-500">€</p>}
                                    type="number"
                                    required
                                    variant="bordered"
                                    isRequired
                                    description='How much was it?'
                                    value={amount}
                                    onValueChange={setAmount}
                                    />

                                    <Select
                                    label="Account"
                                    placeholder="Select an account"
                                    variant="bordered"
                                    isRequired
                                    description='Which account was used?'
                                    selectedKeys={selectedAccount ? [selectedAccount] : []}
                                    onSelectionChange={(keys) => {
                                        const selected = Array.from(keys)[0] as string;
                                        setSelectedAccount(selected);
                                    }}
                                    >
                                       {accounts.length === 0 ? (
                                        <SelectItem key="no-accounts">
                                            No accounts found
                                        </SelectItem>
                                       ) : (
                                        accounts.map(account => (
                                            <SelectItem key={account.account_id.toString()}>
                                                {account.account_name}
                                            </SelectItem>
                                        ))
                                       )} 
                                    </Select>

                                    <Select
                                    label="Category"
                                    placeholder="Select a category"
                                    variant="bordered"
                                    isRequired
                                    description='What category suits it better?'
                                    selectedKeys={selectedCategory ? [selectedCategory] : []}
                                    onSelectionChange={(keys) => {
                                        const selected = Array.from(keys)[0] as string;
                                        setSelectedCategory(selected);
                                    }}
                                    > 
                                        {transactionType === "Expense" ? (
                                            expenseCategories.map(category => (
                                                <SelectItem key={category}>
                                                    {category.charAt(0).toUpperCase() + category.slice(1)}
                                                </SelectItem>
                                            ))
                                        ) : (
                                            incomeCategories.map(category => (
                                                <SelectItem key={category}>
                                                    {category.charAt(0).toUpperCase() + category.slice(1)}
                                                </SelectItem>
                                            ))
                                        )}
                                    </Select>

                                    <Input
                                    label="Description"
                                    placeholder="Description"
                                    variant="bordered"
                                    description="What was it for?"
                                    value={description}
                                    onValueChange={setDescription}
                                    />
                                    <Input
                                    label="Transaction Date"
                                    type="date"
                                    variant="bordered"
                                    description="When did it happen?"
                                    value={transaction_date}
                                    onValueChange={setTransactionDate}
                                    />
                    </ModalBody>
                    <Divider className="my-2"></Divider>
                    <ModalFooter>
                        <Button color="danger" onPress={onCloseAction}>Cancel</Button>
                        <Button 
                            color="primary" 
                            onPress={handleSubmit}
                            isLoading={isSubmitting}
                            isDisabled={isSubmitting}
                        >
                            {isSubmitting ? 'Adding...' : 'Add'}
                        </Button>
                    </ModalFooter>
                    </>
                )}
            </ModalContent>

        </Modal>
    )
}