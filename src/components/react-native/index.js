import React from 'react';

export const View = ({ children, style, ...props }) => <div style={{ display: 'flex', flexDirection: 'column', ...style }} {...props}>{children}</div>;

export const Text = ({ children, ...props }) => <div {...props}>{children}</div>;

export const TextInput = ({ onChangeText, ...rest }) => <input onChange={onChangeText} {...rest} />;

export const Button = ({ title, onPress, ...rest }) => <button onClick={(e) => onPress(e)} {...rest}>{title}</button>;
