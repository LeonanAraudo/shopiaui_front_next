"use client"
import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button, FormControl, InputAdornment, MenuItem } from '@mui/material';
import { ThemeProvider } from '@emotion/react';
import Stack from '@mui/material/Stack';
import { Poppins } from 'next/font/google';
import { createTheme } from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';

export const poppins = Poppins({
    subsets: ['latin'],
    weight: ['400', '500', '700'],
});

const theme = createTheme({
    palette: {
       primary:{
        main:'#324C63'
       },
        warning: {
            main: '#000000',
        },
        secondary: {
            main: '#FFE069',
        },
    },
    typography: {
        fontFamily: poppins.style.fontFamily,
        button: {
            fontWeight: 500,
            textTransform: 'none',
            fontSize: '18px',
        },
    },
    shape: {
        borderRadius: 10,
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 30,
                },
            },
        },
    },
});

export default function FormProduto() {
  const [type, setType] = React.useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setType(event.target.value as string);
  };
    return (
        <div className='w-[100%] mr-[200px] flex flex-col gap-6'>  
            <ThemeProvider theme={theme}>
                <FormControl sx={{ '& > :not(style)': { m: 1, width: '59ch' } }} >
                    <TextField 
                        id="outlined-basic" 
                        label="Nome do Produto" 
                        variant="outlined" 
                    />
                </FormControl>  

                <FormControl sx={{ '& > :not(style)': { m: 1, width: '59ch' } }}>
                    <TextField
                        id="outlined-multiline-static"
                        label="Descrição"
                        multiline
                        rows={4}
                        defaultValue=""
                    />
                </FormControl>
                
                <Box sx={{ width: '700px', display: 'flex', flexDirection: 'row', gap: '27px' }}>
                    <FormControl sx={{ '& > :not(style)': { m: 1, width: '27ch' } }}>
                        <TextField
                            label="Preço do Produto"
                            id="outlined-start-adornment"
                            InputProps={{
                                startAdornment: <InputAdornment position="start">$</InputAdornment>,
                            }}
                        />
                    </FormControl>

                    <FormControl sx={{ '& > :not(style)': { m: 1, width: '27ch' } }}>
                        <TextField 
                            id="outlined-basic" 
                            label="Quantidade Disponível" 
                            variant="outlined" 
                        />
                    </FormControl>
                </Box>
                <FormControl sx={{ width: '27ch',marginLeft:'7px' }}>
                  <InputLabel id="demo-simple-select-label">Tipo de Produto</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={type}
                    label="Tipo de Produto"
                    onChange={handleChange}
                  >
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                  </Select>
                </FormControl>

                <Stack
                    spacing={2}
                    direction="row"
                    sx={{
                        display: 'flex',
                        width: '100%',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginTop: '10px',
                    }}
                >
                    <Button
                        color="secondary" 
                        type='submit'
                        variant="contained"
                        sx={{ width: '223px', height: '45px' }} 
                    >
                        Cadastrar
                    </Button>
                </Stack>
            </ThemeProvider> 
        </div>
    );
}
