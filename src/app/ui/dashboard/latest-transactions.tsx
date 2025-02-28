"use client";
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
} from "@nextui-org/table";
import { Button } from "@nextui-org/button";
import { useDisclosure } from "@nextui-org/react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";
import { useState, useEffect } from "react";
//import { SharedSelection } from "@nextui-org/react";
import {
  fetchLatestTransactions,
  deleteTransactionById,
} from "@/app/lib/services/transactionsServices";
import { Transaction } from "@/app/lib/db/schemas/transactionsSchemas";
import { formatCurrency } from "@/app/lib/utils/utils";
import { ActionButtons, AddTransactionButton } from "./buttons";
import { ConfirmationModal } from "./confirmation-modal";
import Loading from "../loadingSpinner";


export default function LatestTransactionsTable() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedTransaction, setSelectedTransaction] = useState<number | null>(
    null
  );

  useEffect(() => {
    const getLatestTransactions = async () => {
      setIsLoading(true);
      try {
        const result = await fetchLatestTransactions();
        setTransactions(result);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching latest transactions", error);
      }
    };
    getLatestTransactions();
  }, []);
  //console.log("transactions --->", transactions);

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
    Category: Transaction["expense_category"] |  Transaction["income_category"];
    Description: string;
    Amount: string;
    Date: string;
    Actions: React.ReactNode; // Ensures Actions can be a JSX element
  };

  const rows = transactions.map((transaction: Transaction) => ({
    key: transaction.transaction_id,
    Category: transaction.expense_category || transaction.income_category,
    Description: transaction.transaction_date + " - " + transaction.description,
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
  const getKeyValue = (obj: RowData, key: keyof RowData): React.ReactNode => {
    const value = obj[key];

    return typeof value === "string" || typeof value === "number"
      ? value
      : JSON.stringify(value); // Convert non-renderable values
  };

  return (
    <div
      className="w-full max-w-full overflow-x-auto lg:w-1/2 bg-default-50 rounded-2xl"
      style={{ height: "440px" }}
    >
      {/* Confirmation modal bellow */}
      <ConfirmationModal
        onClose={onClose}
        isOpen={isOpen}
        onConfirm={confirmDelete}
      >
        <div></div>
      </ConfirmationModal>
      <Table
        className="w-full "
        aria-label="Latest transactions table"
        radius="md"
        isStriped={true}
        isHeaderSticky={false}
        removeWrapper={false}
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
                    <DropdownItem key="All">
                      <p>All</p>
                    </DropdownItem>
                    <DropdownItem key="Incomes">
                      <p>Incomes</p>
                    </DropdownItem>
                    <DropdownItem key="Expenses">
                      <p>Expenses</p>
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
                <AddTransactionButton variant="ghost" size="md" radius="md">
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
              //allowsSorting={true}
            >
              {column.label}
            </TableColumn>
          ))}
        </TableHeader>
        <TableBody
          isLoading={true}
          loadingContent={
            isLoading && (
              <div className="flex justify-center mt-60">
                {" "}
                <Loading size="lg" />
              </div>
            )
          }
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
                      row.Actions // Ensure this is ReactNode
                    ) : (
                      
                      <>{columnKey === "Category" ? String(row.Category) : getKeyValue(row, columnKey as keyof RowData)}</>
                    )}
                  </TableCell>
                )}
              </TableRow>
            ))) ||
            []}
        </TableBody>
      </Table>
    </div>
  );
}

/* 
      {(item) => (
                        <TableRow key={item.key}>
                            {(columnKey) => <TableCell className="truncate max-w-[100px] overflow-hidden whitespace-nowrap">{getKeyValue(item, columnKey.toString())}</TableCell>}
                        </TableRow>
                    )}
*/
