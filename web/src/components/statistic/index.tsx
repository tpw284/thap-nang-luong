import { Card } from "react-bootstrap"
import "./statistic.scss"
const Statistic = (props: any) => {
    const { data } = props;
    console.log(data);
    const totalDevices = data?.data?.length;
    const alertDevices = data?.data?.filter((device: any) => device?.alert === true).length;
    const workingDevices = totalDevices - alertDevices;

    return (
        <div className="d-flex flex-row justify-content-center statistic-header">
            <Card className="statistic-item px-2">
                <Card.Title className="statistic-title">
                    Total Devices
                </Card.Title>
                <Card.Text className="statistic-counter">{totalDevices}</Card.Text>
            </Card>
            <Card className="statistic-item px-2">
                <Card.Title className="statistic-title">
                    Working Devices
                </Card.Title>
                <Card.Text className="statistic-counter">{workingDevices}</Card.Text>
            </Card>
            <Card className="statistic-item px-2">
                <Card.Title className="statistic-title">
                    Alert Devices
                </Card.Title>
                <Card.Text className="statistic-counter">{alertDevices}</Card.Text>
            </Card>
        </div>
    )
}

export default Statistic;