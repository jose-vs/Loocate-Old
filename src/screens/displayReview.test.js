import React from 'react';

import DisplayReviewsScreen from './DisplayReviewsScreen';
import {View, Text} from 'react-native';
import {shallow} from 'enzyme';
import toJson from 'enzyme-to-json';

describe('View Reviews', () => {
  
  it('should render without issues', () => {
    const component = shallow(<DisplayReviewsScreen />);

    expect(component.length).toBe(1);
    expect(toJson(component)).toMatchSnapshot();
  });
/*
  it('should call onPress event', () => {
    const result = 'I was Pressed';
    const mockFn = jest.fn(() => result);
    const component = shallow(<Button onPress={mockFn} />);

    expect(mockFn).not.toHaveBeenCalled();

    component.props().onPress();

    expect(mockFn.mock.calls.length).toBe(1);
    expect(component.props().onPress()).toBe(result);
  });

  it('should not call onPress event when loading is true', () => {
    const result = 'I was pressed';
    const mockFn = jest.fn(() => result);

    const component = shallow(<Button isLoading={true} onPress={mockFn} />);

    component.props().onPress();
    expect(mockFn.mock.calls.length).toBe(0);
  });

  it('button should render title passed to it', () => {
    const title = 'Primary Button';
    const component = shallow(<Button title={title} />);

    expect(component.find(Text).first().props().children).toBe(title);
  });

  it('should be Loading... text when isLoading === true', () => {
    const component = shallow(<Button isLoading={false} />);
    component.setProps({isLoading: true});
    component.update();
    expect(component.find(Text).first().props().children).toBe('Loading...');
  });

  it('should have transparent styles when transparent is true', () => {
    const transparentContainer = {
      width: '100%',
      height: 50,
      backgroundColor: 'transparent',
      alignItems: 'center',
      justifyContent: 'center',
      marginVertical: 10,
    };

    const transparentTitle = {
      color: '#74B3CE',
    };

    const component = shallow(<Button transparent />);
    expect(component.children(View).props('style').style).toMatchObject(
      transparentContainer,
    );

    expect(
      component.children(View).children(Text).props('style').style,
    ).toMatchObject(transparentTitle);
  });
*/
})
