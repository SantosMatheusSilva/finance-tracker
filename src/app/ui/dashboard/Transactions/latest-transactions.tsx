"use client";
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
} from "@heroui/table";
import { Button } from "@heroui/button";
import { useDisclosure } from "@heroui/react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@heroui/react";
import { Card } from "@heroui/card";
import { useState, useEffect } from "react";
//import { SharedSelection } from "@heroui/react";
import {
  fetchLatestTransactions,
  deleteTransactionById,
} from "@/app/lib/services/transactionsServices";
import { Transaction } from "@/app/lib/db/schemas/transactionsSchemas";
import { formatCurrency } from "@/app/lib/utils/utils";
import { ActionButtons, AddTransactionButton } from "../buttons";
import { ConfirmationModal } from "../confirmation-modal";
//import Loading from "../loadingSpinner";
import { useUser } from "@/app/context/sessionDataProvider";
import { useTransactionModal } from "@/app/context/transactionModalContext";
import { TransactionsTableSkeleton } from "../../Skeleletons";


export default function LatestTransactionsTable() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [allTransactions, setAllTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedTransaction, setSelectedTransaction] = useState<number | null>(
    null
  );
  const { openModal } = useTransactionModal();
  const user = useUser();

  useEffect(() => {
    const getLatestTransactions = async () => {
      setIsLoading(true);
      try {
        const result = await fetchLatestTransactions(user.sessionUser.user_id);
        setTransactions(result);
        setAllTransactions(result);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching latest transactions", error);
      }
    };
    getLatestTransactions();
  }, [user.sessionUser.user_id]);
  console.log("transactions --->", transactions);

  const sortTransactions = (key: string) => {
    let sortedTransactions: Transaction[] = [];
    if (key === "Incomes") {
      sortedTransactions = allTransactions.filter(transaction => transaction.transaction_type === "Income");
    } else if (key === "Expenses") {
      sortedTransactions = allTransactions.filter(transaction => transaction.transaction_type === "Expense");
    } else {
      sortedTransactions = allTransactions;
    }
    setTransactions(sortedTransactions);
  };

  const columns = [
    {
      key: "Category",
      label: "Category",
    },
    {
      key: "Description",
      label: "Description",
      className: "hidden sm:table-cell",
    },
    {
      key: "Amount",
      label: "Amount",
    },
    {
      key: "Date",
      label: "Date",
    },
    {
      key: "Actions",
      label: "Actions",
      //className: "hidden sm:table-cell",
    },
  ];
  const handleDelete = (transaction_id: number) => {
    setSelectedTransaction(transaction_id); // Set the transaction to be deleted
    onOpen(); // Open the modal
  };

  const confirmDelete = async () => {
    if (!selectedTransaction) return;

    try {
      setIsLoading(true); // Show loading indicator
      const deletedTransaction = await deleteTransactionById(
        selectedTransaction
      );
      console.log("Transaction deleted successfully:", deletedTransaction);
      //setIsLoading(false);
      onClose();
      setTransactions((prev) =>
        prev.filter(
          (transaction) => transaction.transaction_id !== selectedTransaction
        )
      );

      alert("Transaction deleted");
    } catch (error) {
      console.error("Error deleting transaction:", error);
      alert("Error deleting transaction");
    } finally {
      //onClose(); // Close the modal
      setSelectedTransaction(null); // Reset selected transaction
    }
  };

  type RowData = {
    key: number;
    Category: string;
    Description: string;
    Amount: string;
    Date: string;
    Actions: React.ReactNode; // Ensures Actions can be a JSX element
  };

  const rows = transactions.map((transaction: Transaction) => ({
    key: transaction.transaction_id,
    transaction_type: transaction.transaction_type,
    Category: transaction.expense_category ?? transaction.income_category ?? "-",
    Description: transaction.description || "-",
    Amount: formatCurrency(transaction.amount),
    Date: transaction.transaction_date,
    Actions: (
      <>
        <ActionButtons
          onDelete={handleDelete}
          transactionId={transaction.transaction_id}
        />
      </>
    ) as React.ReactNode,
  }));
  console.log("rows -->", rows);
  console.log("transactions categories -->", transactions.map(transaction => transaction.expense_category || transaction.income_category));
  //console.log("rows -->", rows);

  // Function to get the value of a key in the row data
  const getKeyValue = (obj: RowData, key: keyof RowData): React.ReactNode => {
    const value = obj[key];

    return typeof value === "string" || typeof value === "number"
      ? value
      : JSON.stringify(value); // Convert non-renderable values
  };

  if (isLoading) {
    return <TransactionsTableSkeleton />;
  }
  return (
    
    <Card
      radius="lg"
      className="w-full max-w-full overflow-x-auto lg:w-1/2 p-4"
      style={{ maxHeight: "440px", minHeight: "440px" }}
    >
      {/* Confirmation modal bellow */}
      <ConfirmationModal
        onCloseAction={onClose}
        isOpen={isOpen}
        onConfirmAction={confirmDelete}
      >
        <div></div>
      </ConfirmationModal>

      <Table
        className="w-full"
        aria-label="Latest transactions table"
        radius="md"
        isStriped
        isHeaderSticky={false}
        removeWrapper={true}
        isCompact={true}
        topContent={
          <>
            <div className="flex flex-row justify-between">
              <div>
                <h1 className="text-xl text-gray-400 p-1">
                  Latest Transactions
                </h1>
              </div>
              <div className=" flex flex-row gap-3 justify-start">
                <Dropdown
                  className="self-center"
                  backdrop="blur"
                  radius="lg"
                  size="md"
                >
                  <DropdownTrigger>
                    <Button className="capitalize" variant="bordered" size="md">
                      Sort
                    </Button>
                  </DropdownTrigger>
                  <DropdownMenu
                    //disallowEmptySelection
                    aria-label="sort selection"
                    closeOnSelect={true}
                    variant="light"
                    color="primary"
                    /* selectedKeys={selectedKeys}
                    selectionMode="single"
                    variant="bordered"
                    color="primary"
                    onSelectionChange={(keys) => setSelectedKeys(keys.selectedKeys)} */
                  >
                    <DropdownItem key="All" onPress={() => sortTransactions("All")}>
                      <p>All</p>
                    </DropdownItem>
                    <DropdownItem key="Incomes" onPress={() => sortTransactions("Incomes")}>
                      <p>Incomes</p>
                    </DropdownItem>
                    <DropdownItem key="Expenses" onPress={() => sortTransactions("Expenses")}>
                      <p>Expenses</p>
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
                <AddTransactionButton variant="ghost" size="md" radius="md" onPress={openModal}>
                  Add
                </AddTransactionButton>
              </div>
            </div>
          </>
        }
      >
        <TableHeader columns={columns}>
          {columns.map((column) => (
            <TableColumn
              key={column.key}
              className={column.className || ""}
              align="center"
              allowsSorting={true}
            >
              {column.label}
            </TableColumn>
          ))}
        </TableHeader>
        <TableBody
          isLoading={isLoading}
          emptyContent={rows.length === 0 ? "No rows to display." : undefined}
        >
          {/* Render the rows only when there is data */}
          {(rows.length > 0 &&
            rows.map((row) => (
              <TableRow key={row.key}>
                {(columnKey) => (
                  <TableCell
                    className={
                      columnKey === "Description"
                        ? "hidden truncate max-w-[100px] overflow-hidden whitespace-nowrap sm:table-cell"
                        : "whitespace-nowrap"
                    }
                    
                  >
                    {columnKey === "Actions" ? (
                      row.Actions
                    ) : columnKey === "Amount" ? (
                      <span className={row.transaction_type === "Income" ? "text-blue-500" : "text-red-500"}>
                        {String(row.Amount)}
                      </span>
                    ) : columnKey === "Category" ? (
                      <span className={"font-semibold"}>
                        {row.Category}
                      </span>
                    ) : (
                      getKeyValue(row, columnKey as keyof RowData)
                    )}
                  </TableCell>
                )}
              </TableRow>
            ))) ||
            []}
        </TableBody>
      </Table>
    </Card>
  );
}

/* 
      {(item) => (
                        <TableRow key={item.key}>
                            {(columnKey) => <TableCell className="truncate max-w-[100px] overflow-hidden whitespace-nowrap">{getKeyValue(item, columnKey.toString())}</TableCell>}
                        </TableRow>
                    )}
*/
