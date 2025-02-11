import React from "react";
import propTypes from "prop-types";

import styled, { css } from "styled-components";
import { createDisabledTextStyles, createFlatBoxStyles } from "../common";
import { blockSizes, fontSizes, padding, fontFamily } from "../common/system";
import Cutout from "../Cutout/Cutout";

const StyledWrapper = styled(Cutout)`
  height: ${blockSizes.md};
  background: ${({ theme, isDisabled }) =>
    isDisabled ? theme.material : theme.canvas};
`;
const StyledFlatWrapper = styled.div`
  position: relative;
  height: ${blockSizes.md};
  ${createFlatBoxStyles()}
`;
export const StyledTextInput = styled.input`
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  padding: 0 ${padding.sm};
  outline: none;
  border: none;
  background: none;
  font-size: ${fontSizes.md};
  font-family: ${fontFamily};
  ${({ disabled, variant }) =>
    variant !== "flat" && disabled && createDisabledTextStyles()}
`;
const TextField = ({
  onChange,
  disabled,
  variant,
  type,
  style,
  shadow,
  className,
  width,
  ...otherProps
}) => {
  const Wrapper = variant === "flat" ? StyledFlatWrapper : StyledWrapper;
  return (
    <Wrapper
      width={width}
      shadow={shadow}
      isDisabled={disabled}
      style={{ ...style, width: width ? width : "auto" }}
      className={className}
    >
      <StyledTextInput
        onChange={disabled ? undefined : onChange}
        readOnly={disabled}
        disabled={disabled}
        variant={variant}
        type={type}
        {...otherProps}
      />
    </Wrapper>
  );
};
TextField.defaultProps = {
  disabled: false,
  type: "text",
  shadow: true,
  variant: "default"
};
TextField.propTypes = {
  width: propTypes.oneOfType([propTypes.string, propTypes.number]),
  onChange: propTypes.func,
  disabled: propTypes.bool,
  variant: propTypes.oneOf(["default", "flat"]),
  shadow: propTypes.bool,
  type: propTypes.string,
  className: propTypes.string
};
export default TextField;
