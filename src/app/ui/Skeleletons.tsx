import React from 'react';
import { 
  Skeleton,
  Card,
} from '@heroui/react';

// Card Skeletons
export function BalanceCardSkeleton() {
  return (
    <Card 
      className="w-full max-w-full max-h-52 flex flex-col justify-center p-4 gap-4" /* md:w-72 h-36 */
      radius="lg"
      >
      <Skeleton className="rounded-lg w-1/2  mb-4 justify-start">
          <div className="h-3 bg-gray-200 dark:bg-gray-700 w-1/2 mb-4"></div>
      </Skeleton>
      <Skeleton className="rounded-lg mb-4 w-1/2 self-center">
          <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded w-10"></div>
      </Skeleton>
      <div className="flex flex-row justify-between w-full gap-4 px-4">
        <Skeleton className="rounded-lg w-1/3">
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-16"></div> 
        </Skeleton>
        <Skeleton className="rounded-lg w-1/3">
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-20"></div>
        </Skeleton>
      </div>
    </Card>
  );
}

export function IncomeCardSkeleton() {
  return (
    <Card 
    className="w-full max-w-full max-h-52 flex flex-col justify-center p-4 gap-4" /* md:w-72 h-36 */
    radius="lg"
    >
    <Skeleton className="rounded-lg w-1/2  mb-4 justify-start">
        <div className="h-3 bg-gray-200 dark:bg-gray-700 w-1/2 mb-4"></div>
    </Skeleton>
    <Skeleton className="rounded-lg mb-4 w-1/2 self-center">
        <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded w-10"></div>
    </Skeleton>
    <div className="flex flex-row justify-between w-full gap-4 px-4">
      <Skeleton className="rounded-lg w-1/3">
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-16"></div> 
      </Skeleton>
      <Skeleton className="rounded-lg w-1/3">
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-20"></div>
      </Skeleton>
    </div>
  </Card>
  );
}

export function ExpenseCardSkeleton() {
  return (
    <Card 
    className="w-full max-w-full max-h-52 flex flex-col justify-center p-4 gap-4" /* md:w-72 h-36 */
    radius="lg"
    >
    <Skeleton className="rounded-lg w-1/2  mb-4 justify-start">
        <div className="h-3 bg-gray-200 dark:bg-gray-700 w-1/2 mb-4"></div>
    </Skeleton>
    <Skeleton className="rounded-lg mb-4 w-1/2 self-center">
        <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded w-10"></div>
    </Skeleton>
    <div className="flex flex-row justify-between w-full gap-4 px-4">
      <Skeleton className="rounded-lg w-1/3">
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-16"></div> 
      </Skeleton>
      <Skeleton className="rounded-lg w-1/3">
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-20"></div>
      </Skeleton>
    </div>
  </Card>
  );
}

export function AccountsCardSkeleton() {
  return (
    <Card 
    className="w-full max-w-full max-h-52 flex flex-col justify-center p-4 gap-4" /* md:w-72 h-36 */
    radius="lg"
    >
    <Skeleton className="rounded-lg w-1/2  mb-4 justify-start">
        <div className="h-3 bg-gray-200 dark:bg-gray-700 w-1/2 mb-4"></div>
    </Skeleton>
    <Skeleton className="rounded-lg mb-4 w-1/2 self-center">
        <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded w-10"></div>
    </Skeleton>
    <div className="flex flex-row justify-between w-full gap-4 px-4">
      <Skeleton className="rounded-lg w-1/3">
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-16"></div> 
      </Skeleton>
      <Skeleton className="rounded-lg w-1/3">
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-20"></div>
      </Skeleton>
    </div>
  </Card>
  );
}

// Chart Skeleton
export function ChartSkeleton() {
  return (
    <Card 
    radius="lg"
    className="w-full max-w-full lg:w-1/2 p-4" style={{ height: "440px" }}>
      <Skeleton className="rounded-lg w-1/3  mb-4 justify-start">
        <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/3"></div>
      </Skeleton>
      <Skeleton className="rounded-lg w-full h-80">
        <div className="h-80 bg-gray-200 dark:bg-gray-700 rounded"></div>
      </Skeleton>
    </Card>
  );
}

// Transactions Table Skeleton
export function TransactionsTableSkeleton() {
  return (
    <Card 
    radius="lg"
    className="w-full max-w-full overflow-x-auto lg:w-1/2 p-4" style={{ minHeight: "440px", maxHeight: "440px" }}>
      <div className="flex justify-between items-center mb-4">
        <Skeleton className="rounded-lg w-1/3">
          <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/3"></div>
        </Skeleton>
        <div className="flex gap-2">
          <Skeleton className="rounded-lg w-16">
            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-16"></div>
          </Skeleton>
          <Skeleton className="rounded-lg w-16">
            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-16"></div>
          </Skeleton>
        </div>
      </div>
      
      {/* Table Skeleton */}
      <div 
      //radius="lg"
      className="space-y-3 mt-4 p-4">
        {/* Table Header */}
        <div className="flex justify-between gap-4 py-2 border-b border-gray-200 dark:border-gray-700">
          <Skeleton className="rounded-lg w-16">
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-16"></div>
          </Skeleton>
          <Skeleton className="rounded-lg w-24">
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-24 hidden sm:block"></div>
          </Skeleton>
          <Skeleton className="rounded-lg w-16">
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-16"></div>
          </Skeleton>
          <Skeleton className="rounded-lg w-16">
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-16"></div>
          </Skeleton>
          <Skeleton className="rounded-lg w-16">
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-16"></div>
          </Skeleton>
        </div>
        
        {/* Table Rows */}
        {[...Array(5)].map((_, index) => (
          <div key={index} className="flex gap-4 py-2 justify-between">
            <Skeleton className="rounded-lg w-16">
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-16"></div>
            </Skeleton>
            <Skeleton className="rounded-lg w-32">
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-32 hidden sm:block"></div>
            </Skeleton>
            <Skeleton className="rounded-lg w-16">
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-16"></div>
            </Skeleton>
            <Skeleton className="rounded-lg w-16">
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-16"></div>
            </Skeleton>
            <Skeleton className="rounded-lg w-16">
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-16"></div>
            </Skeleton>
          </div>
        ))}
      </div >
    </Card>
  );
}

// Planner Skeletons
export function BudgetsCardSkeleton() {
  return (
    <Card
    radius="lg"
     className="w-full max-w-full lg:w-1/2 p-4">
      <Skeleton className="rounded-lg w-1/4 mb-4">
      <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/4 mb-4"></div>
      </Skeleton>
      <div className="flex flex-row gap-2">
        <Card className="flex flex-col rounded-lg items-center p-2 w-52 h-28">
          <Skeleton className="rounded-lg w-8 mb-2">
          <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-8 mb-2"></div>
          </Skeleton>
          <Skeleton className="rounded-lg w-16 mb-2">
          <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-16 mb-2"></div>
          </Skeleton>
          <Skeleton className="rounded-lg w-24">
          <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-24"></div>
          </Skeleton>
        </Card>
      </div>
    </Card>
  );
}

export function GoalsCardSkeleton() {
  return (
    <Card
    radius="lg"
     className="w-full max-w-full lg:w-1/2 p-4">
      <Skeleton className="rounded-lg w-1/4 mb-4">
      <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/4 mb-4"></div>
      </Skeleton>
      <div className="flex flex-row gap-2">
        <Card className="flex flex-col rounded-lg items-center p-2 w-52 h-28">
          <Skeleton className="rounded-lg w-8 mb-2">
          <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-8 mb-2"></div>
          </Skeleton>
          <Skeleton className="rounded-lg w-16 mb-2">
          <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-16 mb-2"></div>
          </Skeleton>
          <Skeleton className="rounded-lg w-24">
          <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-24"></div>
          </Skeleton>
        </Card>
      </div>
    </Card>
  );
}

// Inline Skeletons for individual elements
export function InlineBalanceSkeleton() {
  return <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-24 animate-pulse"></div>;
}

export function InlineAmountSkeleton() {
  return <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-20 animate-pulse"></div>;
}

export function InlineTextSkeleton({ width = "w-16" }: { width?: string }) {
  return <div className={`h-4 bg-gray-200 dark:bg-gray-700 rounded ${width} animate-pulse`}></div>;
}

// Cards Grid Skeleton
export function CardsGridSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <BalanceCardSkeleton />
      <IncomeCardSkeleton />
      <ExpenseCardSkeleton />
      <AccountsCardSkeleton />
    </div>
  );
}

// Chart and Transactions Section Skeleton
export function ChartAndTransactionsSkeleton() {
  return (
    <div className="flex flex-col gap-5 items-center lg:flex-row justify-between">
      <ChartSkeleton />
      <TransactionsTableSkeleton />
    </div>
  );
}

// Planner Section Skeleton
export function PlannerSectionSkeleton() {
  return (
    <div className="flex flex-col gap-4 lg:flex-row justify-between">
      <BudgetsCardSkeleton />
      <GoalsCardSkeleton />
    </div>
  );
}

export function SidenavSkeleton() {
  return (
    <div className="w-56 h-full bg-default-100 dark:bg-default-900 p-4 flex flex-col gap-4 animate-pulse">
      <div className="h-12 w-12 bg-gray-200 dark:bg-gray-700 rounded-full mb-6 mx-auto" />
      {[...Array(5)].map((_, i) => (
        <div key={i} className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-5/6 mx-auto" />
      ))}
      <div className="flex-1" />
      <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-2/3 mx-auto mt-4" />
    </div>
  );
}

export function TopbarSkeleton() {
  return (
    <div className="w-full h-16 bg-default-100 dark:bg-default-900 flex items-center px-6 gap-4 animate-pulse">
      <div className="h-10 w-10 bg-gray-200 dark:bg-gray-700 rounded-full" />
      <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-32" />
      <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-24" />
      <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-16 ml-auto" />
    </div>
  );
}
