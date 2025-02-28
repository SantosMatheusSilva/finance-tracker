import {
    Card, 
    CardHeader, 
    CardBody, 
    CardFooter,
} from "@nextui-org/card";
import {ScrollShadow} from "@nextui-org/scroll-shadow";
import {Progress} from "@nextui-org/progress";
export default function PlannerCard() {

    return(
        
        <div
        className="flex flex-col gap-4 lg:flex-row justify-between"
        >   
        {/* BUDGETS */}    
         <Card
        className="w-full max-w-full lg:w-1/2" 
        radius="lg"
        isBlurred={false}
        >
            <CardHeader>
            <h1 className="text-xl text-gray-400">Budgets</h1>
            </CardHeader>
            <CardBody>
                <div className="flex flex-row gap-2">
                <ScrollShadow
                orientation="horizontal"
                >
                <div className="flex flex-col rounded-lg bg-default-300 items-center p-2 w-52 h-28">
                    <h1>icon</h1>
                    <h2>Status</h2>
                    <Progress 
                     classNames={{
                        base: "max-w-md",
                        track: "drop-shadow-md border border-default",
                        indicator: "bg-gradient-to-r from-green-500 to-red-500",
                        label: "tracking-wider font-medium text-default-600",
                        value: "text-foreground/60",
                      }}
                    size="md"
                    color="success"
                    label='budget category'
                    radius="sm"
                    showValueLabel={true}
                    value={65}
                    />
                </div>
                </ScrollShadow>
               </div>
            </CardBody>
        </Card>

       {/* GOALS */ }
        <Card
        className="w-full max-w-full lg:w-1/2"
        radius="lg"
        isBlurred={false}
        >
            <CardHeader>
            <h1 className="text-xl text-gray-400">Goals</h1>
            </CardHeader>
            <CardBody>
               <div className="flex flex-row gap-2">
               <ScrollShadow
                orientation="horizontal"
                >
                <div className="flex flex-col rounded-lg bg-default-300 items-center p-2 w-52 h-28">
                    <h1>category icon</h1>
                    <h2>Goal name</h2>
                    <Progress 
                     classNames={{
                        base: "max-w-md",
                        track: "drop-shadow-md border border-default",
                        indicator: "bg-gradient-to-r from-green-500 to-blue-500",
                        label: "tracking-wider font-medium text-default-600",
                        value: "text-foreground/60",
                      }}
                    size="md"
                    color="success"
                    formatOptions={{style: "currency", currency: "eur"}}
                    label='days left'
                    radius="sm"
                    showValueLabel={true}
                    value={65}
                    maxValue={100}
                    />
                </div>
                </ScrollShadow>
               </div>
            </CardBody>
        </Card>

        </div>
    )

}