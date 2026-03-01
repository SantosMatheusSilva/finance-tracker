import { CreateAccount } from "@/app/lib/db/schemas/accountSchemas";
import { useState } from "react";
import { useUser } from "@/app/context/sessionDataProvider";
import { useDashboard } from "@/app/context/dashboardContext";
import { createAccountService } from "@/app/lib/services/accountsServices";

import {
    Form,
    Input,
    Button,
    Select,
    SelectItem,
} from "@heroui/react";

export default function AddAccountForm() {
    const user = useUser();
    const { refreshDashboard } = useDashboard();
    const [account, setAccount] = useState<Omit<CreateAccount, 'user_id'>>({
        account_name: "",
        account_type: "Cash",
        balance: 0,
        currency: "EUR",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        
        try {
            const accountData: CreateAccount = {
                ...account,
                user_id: user.sessionUser.user_id,
            };
            console.log('accountData', accountData)
            console.log('user_id', user.sessionUser.user_id)
            console.log('sessionUser', user.sessionUser)
            
            const result = await createAccountService(accountData);
            
            if (result.message.includes('successfully')) {
                refreshDashboard(); // Refresh dashboard data
                // Reset form
                setAccount({
                    account_name: "",
                    account_type: "Cash",
                    balance: 0,
                    currency: "EUR",
                });
                
                alert('Account created successfully!');

            } else {
                alert(result.message);
            }
        } catch (error) {
            console.error('Failed to create account:', error);
            alert('Failed to create account');
        } finally {
            setIsSubmitting(false);
        }
    }
    //console.log(account)

    return (
        <Form onSubmit={handleSubmit}>
            <Input 
                label="Account Name"
                type="text" 
                placeholder="Account Name"
                required
                variant="bordered"
                description="The name of the account"
                value={account.account_name}
                onValueChange={(value) => setAccount({...account, account_name: value})}
            />

            <Select
                label="Account Type"
                required
                variant="bordered"
                description="The type of the account"
                selectedKeys={[account.account_type]}
                onSelectionChange={(keys) => {
                    const selected = Array.from(keys)[0] as string;
                    const normalizedType = selected.charAt(0).toUpperCase() + selected.slice(1).toLowerCase();
                    setAccount({...account, account_type: normalizedType as "Cash" | "Bank" | "Credit Card" | "Investment"});
                }}
            >
                <SelectItem key="Cash" >Cash</SelectItem>
                <SelectItem key="Bank" >Bank</SelectItem>
                <SelectItem key="Credit Card" >Credit Card</SelectItem>
                <SelectItem key="Investment" >Investment</SelectItem>
            </Select>

            <Input
                label="Account Balance"
                type="number"
                placeholder="Account Balance"
                required
                variant="bordered"
                description="There's any initial balance?"
                value={account.balance.toString()}
                onValueChange={(value) => setAccount({...account, balance: parseFloat(value) || 0})}
            />

            <Button 
                type="submit" 
                color="primary" 
                variant="solid" 
                className="w-full"
                isLoading={isSubmitting}
                isDisabled={isSubmitting}
            >
                {isSubmitting ? 'Creating...' : 'Add Account'}
            </Button>
        </Form>
    )
}