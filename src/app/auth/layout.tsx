


export default function Layout({
    children,
}: {
    children: React.ReactNode
}) {

    return (
        <>
            <div className="flex min-h-svh w-screen items-center justify-center ">
                {children}
            </div>
        </>
    )

}