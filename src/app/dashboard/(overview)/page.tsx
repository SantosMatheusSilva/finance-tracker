
import CardWrapper from '@/app/ui/dashboard/cards';
import Chart from '@/app/ui/dashboard/overview-chart';
import LatestTransactions from '@/app/ui/dashboard/latest-transactions';
import PlannerCard from '@/app/ui/dashboard/planner-card';

export default async function Page() {
 
    return(
       <> 
       <div className=''>
        <div   className='flex flex-col justify-between   md:justify-between' > {/* grid sm:grid-cols-2 lg:grid-cols-4 */}
            <CardWrapper />
        </div>
        <div className='flex flex-col gap-5 items-center lg:flex-row justify-between mt-5'>
            <Chart />
            <LatestTransactions />
        </div>
        <div className='justify-center mt-5'>
            <PlannerCard />
        </div>
        </div>
        </>
    )
}   
