import {
  ComponentProps,
  Streamlit,
  withStreamlitConnection,
} from "streamlit-component-lib"
import React, { useEffect } from "react"
import { Slider, Stack, createTheme, SliderValueLabelProps, Tooltip } from "@mui/material";
import { ThemeProvider } from '@mui/material/styles';


const VerticalSlider = (props: ComponentProps) => {
  const { label, thumb_height, thumb_style, thumb_color, height, min_value, max_value, default_value, step, track_color, slider_color, opacity, value_always_visible, range } = props.args;
  let slots_custom = null

  function ValueLabelComponentOpen(props: SliderValueLabelProps) {
    const { children, value } = props;

    return (
      <Tooltip enterTouchDelay={0} placement="top" title={value} open={true}>
        {children}
      </Tooltip>
    )
  }
  function ValueLabelComponentAuto(props: SliderValueLabelProps) {
    const { children, value } = props;

    return (
      <Tooltip enterTouchDelay={0} placement="top" title={value}>
        {children}
      </Tooltip>
    );
  }

  if (value_always_visible === true) {
    slots_custom = { valueLabel: ValueLabelComponentOpen }
  }
  else {
    slots_custom = { valueLabel: ValueLabelComponentAuto }
  }

  const [value, setValue] = React.useState(
    range ? (Array.isArray(default_value) ? default_value : [min_value, max_value]) : default_value,
  )

  useEffect(() => Streamlit.setFrameHeight());

  const handleChange = (event: any, newValue: number | number[]) => {
    setValue(newValue);
  };

  const handleChangeCommitted = (event: any, newValue: number | number[]) => {
    Streamlit.setComponentValue(newValue);
  };

  const snowflakeTheme = createTheme({
    components: {
      MuiSlider: {
        styleOverrides: {
          root: {
            height: height,
            color: "inherit",
            overflow: "visible",
            width: 'fit-content !important',
            fontSize: 8,
            marginBottom: 0,
            '&:focus-within': {
              outline: '2px solid #1976d2',
              outlineOffset: '2px',
            },
          },

          thumb: {
            color: thumb_color,
            width: "0.75rem !important",
            borderRadius: thumb_style,
            height: thumb_height,
            '&:focus, &:hover, &.Mui-focusVisible': {
              boxShadow: '0px 0px 0px 8px rgba(25, 118, 210, 0.16)',
            },
            '&.Mui-active': {
              boxShadow: '0px 0px 0px 14px rgba(25, 118, 210, 0.16)',
            },
          },
          valueLabel: {
            backgroundColor: thumb_color,
            borderRadius: "10px",
            fontSize: 10,
            // width: "fit-content"

          },
          track: {
            background: slider_color,
            opacity: opacity,
            width: "5px !important",
            borderRadius: 2,
            marginBottom: 0,
            borderWidth: 0
          },
          rail: {
            background: track_color,
            opacity: 100,
            width: "5px !important",
            borderRadius: 1,
            marginBottom: 0
          }
        }
      },
      MuiStack: {
        styleOverrides: {
          root: {
            fontSize: 12,
            fontFamily: ["Source Sans Pro", "sans-serif"],
            // color: "rgb(49, 51, 63)",
            alignItems: "center",
            justifyContent: "center",
            textWrap: "wrap",
            margin: 0,
          }
        }
      }
    }
  }
  );

  return (
    <ThemeProvider theme={snowflakeTheme}>
      <Stack component="div" direction="column" alignItems="center" justifyContent="center" sx={{ maxWidth: 200 }}>
        <label>{max_value}</label>
        <Slider
          min={min_value}
          step={step}
          max={max_value}
          onChange={handleChange}
          onChangeCommitted={handleChangeCommitted}
          slots={slots_custom}
          aria-label="custom thumb label"
          orientation="vertical"
          valueLabelDisplay={value_always_visible}
          value={value}
        />
        <label>{min_value}</label>
        <label>{label}</label>
      </Stack>
    </ThemeProvider >
  );
}

export default withStreamlitConnection(VerticalSlider);


