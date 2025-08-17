import {redirect} from "next/navigation";

export default async function Page(props: { params: Promise<{ chapter: string }> }) {
    const params = await props.params;

    return <div
    className={"ml-2"}
    >{params.chapter}</div>
}
