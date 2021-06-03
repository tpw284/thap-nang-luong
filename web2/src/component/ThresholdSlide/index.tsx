import { Button, Col, InputNumber, Modal, Row, Slider } from "antd";
import { useEffect, useState } from "react";
import { Device } from "../Devices";
import { useMutation } from "@apollo/client";
import { SET_FEEDING_THRESHOLD } from "../Statistics/setThresholdSchema";

export interface Property {
    label: string,
    value: string,
    marks?: any,
    maxValue: number,
    minValue: number,
    safeThresholeType: string,
    thresholdColor: {
        errorThreshold: string,
        safeThreshold: string,
    }
}
interface ThresholdSlideItemProps {
    data: Device,
    property: Property,
}

const ThresholdSlideItem = (props: ThresholdSlideItemProps) => {
    const { data, property } = props;
    const [ updateThreshold ] = useMutation(SET_FEEDING_THRESHOLD);
    const [ inputValue, setInputValue ] = useState((data as any)[property.value].threshold);
    const [ isDisableButton, setIsDisableButton ] = useState(true);
    
    useEffect(() => {
        setInputValue((data as any)[property.value].threshold)
    },[property,data])

    useEffect(() => {
        setIsDisableButton(inputValue === (data as any)[property.value].threshold);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[inputValue]);

    const handleOnChange = (value: number) => {
        setInputValue(value)
    }

    const { confirm } = Modal;
    const showConfirm = () => {
        confirm({
            title: 'Xác nhận điều chỉnh ngưỡng',
            content: `${property.label} thay đổi chỉ số từ ${(data as any)[property.value].threshold} thành ${inputValue}`,
            onOk() {
                setIsDisableButton(true);
                updateThreshold({
                    variables: {
                        value: inputValue,
                        id: data._id,
                        property: property.value,
                    }
                });
            },
            onCancel() {
            },
        });
        
    }

    const handleClickReset = () => {
        setIsDisableButton(false);
        setInputValue((data as any)[property.value].threshold);
    }

    return (
        <div className="thresholdSlideItem">
            <h3 className="">Thiết lập ngưỡng cho phép</h3>
            <h4 className="">{property.label}</h4>
            <Row>
                <Col span={8}>
                    <div style={{display:'inline-block', height:'45vh', marginTop:"4vh"}}>
                    <Slider
                        min={property.minValue}
                        max={property.maxValue}
                        onChange={handleOnChange}
                        value={typeof inputValue === 'number' ? inputValue : 0}
                        marks={property.marks}
                        defaultValue={(data as any)[property.value].threshold}
                        included
                        vertical
                    />
                    </div>
                </Col>
                <Col span={8} style={{ margin: '0 16px' }}>
                    <InputNumber
                        min={0}
                        max={100}
                        className="my-5"
                        // formatter={value => `${value}`}
                        value={inputValue}
                        onChange={handleOnChange}
                    />
                    <Button
                        style={{ marginBottom: '16px' }}
                        type="primary"
                        onClick={showConfirm}
                        disabled={isDisableButton}
                    >
                        Confirm
                    </Button>
                    <Button
                        style={{ marginBottom: '16px' }}
                        type="primary"
                        danger
                        onClick={handleClickReset}
                    >
                        Reset
                    </Button>
                </Col>
            </Row>
        </div>
    )
}

export default ThresholdSlideItem;