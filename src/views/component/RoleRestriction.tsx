import React from 'react';

interface Props {
  role: string;
  allowedRole: string[];
}

export class RoleRestriction extends React.Component<Props> {
  static defaultProps: Partial<Props> = {
    role: '',
    allowedRole: []
  };

  render() {
    const { role, allowedRole } = this.props;

    const found = allowedRole.find(x => {
      return x.toLowerCase() === role.toLowerCase();
    });

    if (found) {
      return <>{this.props.children}</>;
    }

    return (
      <h3>
        {role} allowed {allowedRole}
      </h3>
    );
  }
}
