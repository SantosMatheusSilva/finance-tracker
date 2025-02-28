import {Card, 
    CardHeader,     
    CardBody,   
    CardFooter
} from "@nextui-org/card";
import { Button } from "@nextui-org/button";

export default function UserCard() {

    return(
        <Card
        className="w-full h-full" 
        radius="lg"
        isBlurred={true}
        >
            <CardHeader>
                <h1>Finance Tracker</h1>
            </CardHeader>
            <CardBody>
                <h2>User Name</h2>
                <h3>Email</h3>
            </CardBody>
            <CardFooter
            className="justify-end"
            >
                <Button
                variant="faded"
                size="sm"
                >
                    Update
                </Button>
            </CardFooter>
        </Card>
    )

}