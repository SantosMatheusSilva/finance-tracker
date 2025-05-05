import {
    Card, 
    CardBody, 
} from "@heroui/card";
import {
    HomeIcon,
    PlusCircleIcon,
    Squares2X2Icon,
    CreditCardIcon,
    ClipboardDocumentListIcon
} from '@heroicons/react/24/solid';
import Link from 'next/link';

export default function BottomNav() {

    return(
        <Card
        className="max-w-screen-sm h-12 fixed bottom-3 left-1 right-1 z-50 rounded-3xl overflow-visible"
        radius="lg"
        isBlurred={true}
        //fullWidth={true}
        >
            <CardBody className="flex flex-row gap-2 justify-between items-center p-2 h-full overflow-visible">
                <Link href={"/dashboard"}>
                    <HomeIcon className="size-8"/>
                </Link>
                <Link href={""}>
                    <Squares2X2Icon  className="size-8" />
                </Link>
                <Link href={""}>
                    <PlusCircleIcon className="size-20 text-primary-500" />
                </Link>
                <Link href={"/dashboard/accounts"}>
                    <CreditCardIcon className="size-8" />
                </Link>
                <Link href={"/dashboard/transactions"}>
                    <ClipboardDocumentListIcon className="size-8"/>
                </Link>
            </CardBody>
        </Card>
    )
}