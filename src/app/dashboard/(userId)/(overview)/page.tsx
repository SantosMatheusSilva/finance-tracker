'use client';
import CardWrapper from '@/app/ui/dashboard/cards';
import OverviewChart  from '@/app/ui/dashboard/overview-chart';
import LatestTransactions from '@/app/ui/dashboard/Transactions/latest-transactions';
import PlannerCard from '@/app/ui/dashboard/planer/planner-card';
import { useUser } from '@/app/context/sessionDataProvider';


export default function OverviewPage() {
   const {sessionUser} = useUser();

    
    if (!sessionUser) {
        return (
            <>
            <h1 className='text-2xl font-bold text-center mt-5'>You do not have access to this page.</h1>   
            </>
        )
    }
 
    return(
       <> 
         <div className=''>
          {sessionUser && (
              <>
          <div   className='flex flex-col justify-between   md:justify-between' > {/* grid sm:grid-cols-2 lg:grid-cols-4 */}
              <CardWrapper />
          </div>
          <div className='flex flex-col gap-5 items-center lg:flex-row justify-between mt-5'>
              <OverviewChart />
              <LatestTransactions />
          </div>
          <div className='justify-center mt-5'>
              <PlannerCard />
          </div>
          </>
          )}
          </div>
        </>
    )
}   
