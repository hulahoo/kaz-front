import React from 'react';
import {Card} from "antd";

export type PanelCardProps = {
  loading?: boolean
  name?: string,
  header?: JSX.Element,
}

class PanelCard extends React.Component<PanelCardProps> {

  render() {
    return (
      <Card className={"course-card"}
            loading={this.props.loading}
            hoverable={!this.props.loading}
            cover={this.props.header}>
        {this.props.children}
      </Card>
    );
  }

  componentDidMount(): void {

  }
}

export default PanelCard;