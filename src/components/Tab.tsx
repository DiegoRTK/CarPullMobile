import React from 'react';
import {Tab} from 'react-native-elements';
import {globalStyles} from '../utils/globalStyles';

interface TabProps {
  items: any[];
  onChange: (tab: number) => void;
  tabSelected?: number;
}

const TabShared: React.FC<TabProps> = ({
  items = [],
  onChange,
  tabSelected = 0,
}) => {
  return (
    <Tab
      value={tabSelected}
      disableIndicator
      variant="default"
      style={[globalStyles.roundedButton]}
      indicatorStyle={globalStyles.tabSelectedStyle}
      onChange={onChange}>
      {items.map((item, index) => (
        <Tab.Item
          key={index}
          title={item.title}
          buttonStyle={globalStyles.smallSizeTabs}
          containerStyle={
            tabSelected === index
              ? globalStyles.whiteColor
              : globalStyles.mainColor
          }
          titleStyle={
            tabSelected === index
              ? globalStyles.tabItemTitle
              : globalStyles.selectedTabItemTitle
          }
        />
      ))}
    </Tab>
  );
};

export default TabShared;
