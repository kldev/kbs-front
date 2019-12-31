import React from 'react';
import { Stack, IStackTokens } from 'office-ui-fabric-react/lib/Stack';
import { Label } from 'office-ui-fabric-react/lib/Label';
import { Rating } from 'office-ui-fabric-react/lib/Rating';

interface Props {}

const displayTokens: Partial<IStackTokens> = {
  childrenGap: 20
};

export const SalesmanDisplay: React.FunctionComponent = (props: Props): JSX.Element => {
  return (
    <Stack tokens={displayTokens} horizontal={false}>
      <Label>Salesman name</Label>
      <Label>Salesman image</Label>
      <Rating />
    </Stack>
  );
};
