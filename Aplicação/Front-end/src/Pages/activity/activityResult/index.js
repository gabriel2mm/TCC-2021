import React from 'react';
import { Result, Button } from 'antd';
import { Link, Redirect } from "react-router-dom";
function ActivityResultPage({ activityNumber }) {
    return (
        <Result
            status="success"
            title="Chamado aberto com sucesso"
            subTitle={`Seu chamado #${activityNumber} foi aberto com sucesso`}
            extra={[
                <Link to="/activities" key="my-activities">
                    <Button type="primary">
                        Ir para meus chamados
                    </Button>
                </Link>
            ]}
        />
    )

}



export default ActivityResultPage;