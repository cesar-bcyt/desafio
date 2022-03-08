import { Input, Label } from "semantic-ui-react";

interface Props {
    label: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    value: string;
    disabled?: boolean;
}

const Dato = (props: Props) => (
    <div style={{ display: 'flex', flexDirection: 'row', gap: '10px'}}>
        <div style={{ width: '170px' }}>
            <Label style={{ width: '170px', height: '26px' }}>{props.label}</Label>
        </div>
        <Input
            disabled={props.disabled}
            style={{ height: '26px', width: '100%' }}
            onChange={props.disabled ? () => {} : props.onChange}
            value={props.value}
        />
    </div>
)

export default Dato;