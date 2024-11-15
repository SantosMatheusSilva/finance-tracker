import { getData } from '@/app/lib/data'

export default async function Page() {
    const data = await getData();

    return(
        <div>
            <h1>Dashboard</h1>
            <p>{await getData()}</p>
        </div>
    )
}