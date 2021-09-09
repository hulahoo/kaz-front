import React from 'react';
import DismissalRequestEdit from './DismissalRequestEdit';
import DismissalIntervew from './ExitInterview/DismissalInterview';

interface State {
    isInterviewOpen: boolean;
    data: any;
    entityId: string;
}

interface Props {
    entityId: string;
    withoutPage?: boolean;
    [key: string]: any;
}

interface IDismissalRequestFormCtx {
    isInterviewOpen: boolean;
    openInterview(): any;
    closeInterview(): any;
    toggleInterview(): any;
}

export const DismissalRequestFormCtx = React.createContext<IDismissalRequestFormCtx>({
    isInterviewOpen: false,
    openInterview() { },
    closeInterview() { },
    toggleInterview() { },

})

class DismissalRequestFormComponent extends React.Component<Props, State> {

    state = {
        isInterviewOpen: false,
        data: null,
        entityId: "",
    }

    openInterview() {
        this.setState({ isInterviewOpen: true });
    }

    closeInterview() {
        this.setState({ isInterviewOpen: false });
    }

    toggleInterview() {
        this.setState(({ isInterviewOpen }) => ({ isInterviewOpen: !isInterviewOpen }));
    }

    render() {
        return (
            <DismissalRequestFormCtx.Provider value={{
                isInterviewOpen: this.state.isInterviewOpen,
                openInterview: this.openInterview.bind(this),
                closeInterview: this.closeInterview.bind(this),
                toggleInterview: this.toggleInterview.bind(this),
            }}>
                {
                    this.state.isInterviewOpen
                        ? <DismissalIntervew
                            data={this.state.data}
                            closeInterview={this.closeInterview.bind(this)} />
                        : <DismissalRequestEdit
                            setData={(data: any) => this.setState({ data })}
                            openInterview={this.openInterview.bind(this)}
                            {...this.props}
                            entityId={this.state.entityId || this.props.entityId}
                            setEntityId={(entityId: string) => this.setState({ entityId })}
                        />
                }
            </DismissalRequestFormCtx.Provider>
        )
    }

}

export default DismissalRequestFormComponent;