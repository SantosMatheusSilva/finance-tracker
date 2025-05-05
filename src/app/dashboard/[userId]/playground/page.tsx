'use client'
import AddTransactionModal from "@/app/ui/dashboard/add-transaction-modal";
import { useEffect } from "react";

export default function ComponentsTestingPage () {
    useEffect(() => {
        // Simulate modal opening on mount
        const openEvent = new CustomEvent("openModal");
        window.dispatchEvent(openEvent);
      }, []);
      
    return (
        <>
        <AddTransactionModal />
        </>
    )
}