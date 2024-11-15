import { FC } from "react"

import { STitle } from "../../styles/STitle"

type Props = {
    title: string;
}

export const Title: FC<Props> = (props) => {
    const {title} = props;
    return (
        <STitle>
            {title}
        </STitle>
    )
}