import { FC } from "react";
import { SButton } from "../../styles/SButton";

type Props = {
    onClick: () => void;
}

export const PraimaryButton: FC<Props> = (props) => {
    const {onClick} = props;

    return(
        <SButton onClick={onClick}>
            ゲームリセット
        </SButton>
    );
};