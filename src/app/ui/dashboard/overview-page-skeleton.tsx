import {
    CardsGridSkeleton,
    ChartAndTransactionsSkeleton,
    PlannerSectionSkeleton,
} from "@/app/ui/Skeleletons";

export default function OverviewPageSkeleton() {
    return (
        <div className="p-4 space-y-5">
            <CardsGridSkeleton />
            <ChartAndTransactionsSkeleton />
            <PlannerSectionSkeleton />
        </div>
    );
}