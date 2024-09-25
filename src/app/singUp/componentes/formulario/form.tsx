import * as React from 'react'
import { Poppins } from 'next/font/google'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import { createTheme, InputLabel } from '@mui/material'
import { ThemeProvider } from '@emotion/react'
import IconButton from '@mui/material/IconButton'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputAdornment from '@mui/material/InputAdornment'
import FormControl from '@mui/material/FormControl'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import {useForm} from 'react-hook-form'
import { createUser } from '../../apiSU/create-user'
import {z} from 'zod'
import {zodResolver} from '@hookform/resolvers/zod'

export const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
})

const theme = createTheme({
  palette: {
    primary: {
      main: '#000000',
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
})
const createUserForm = z.object({
  username: z.string().min(1, 'informe a atividade que deseja realizar'),
  password: z.string().min(1).max(8, 'Senha Invalida'),
})

type CreateUserForm = z.infer<typeof createUserForm>

export default function Formulario() {
  const [showPassword, setShowPassword] = React.useState(false)
  const [showPassword2, setShowPassword2] = React.useState(false)

  const handleClickShowPassword = () => setShowPassword(show => !show)
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault()
  }

  const handleClickShowPassword2 = () => setShowPassword2(show => !show)
  const handleMouseDownPassword2 = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault()
  }

  const {register, handleSubmit, formState } = useForm<CreateUserForm>({
    resolver: zodResolver(createUserForm)
  });
    
  async function handleCreateUser(data: CreateUserForm) {
    await createUser({
      username: data.username,
      password: data.password,
    })
  }

  return (
    <form onSubmit={handleSubmit(handleCreateUser)} className="w-full flex items-center justify-center flex-col">
      <Box component="form" sx={{ width: '65ch', marginTop: '20px' }}>
        <ThemeProvider theme={theme}>
          <TextField
            id="outlined-basic"
            color="primary"
            label="Digite seu Email"
            variant="outlined"
            {...register('username')}
            slotProps={{
              input: {
                sx: {
                  backgroundColor: '#AEBFDC',
                  width: '55ch',
                  marginLeft: '5px',
                  boxShadow:
                    '0px 4px 6px -1px rgba(0, 0, 0, 0.1), 0px 2px 4px -2px rgba(0, 0, 0, 0.06)', // Sombra do M3
                },
              },
            }}
          />
          {formState.errors.username && (
            <p className="text-red-400 text-sm">
              {formState.errors.username.message}
            </p>
          )}
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              gap: '40px',
              marginTop: '40px',
              marginLeft: '5px',
            }}
          >
            <FormControl sx={{ width: '32ch' }} variant="outlined">
              <InputLabel htmlFor="senha">Senha</InputLabel>
              <OutlinedInput
                id="senha"
                {...register('password')}
                type={showPassword ? 'text' : 'password'}
                sx={{
                  backgroundColor: '#AEBFDC',
                  boxShadow:
                    '0px 4px 6px -1px rgba(0, 0, 0, 0.1), 0px 2px 4px -2px rgba(0, 0, 0, 0.06)',
                }}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="password"
              />
                {formState.errors.password && (
                <p className="text-red-400 text-sm">
                  {formState.errors.password.message}
                </p>
                 )}
            </FormControl>

            <FormControl sx={{ width: '32ch' }} variant="outlined">
              <InputLabel htmlFor="ConfirmarSenha">Confirmar Senha</InputLabel>
              <OutlinedInput
                id="ConfirmarSenha"
                type={showPassword2 ? 'text' : 'password'}
                sx={{
                  backgroundColor: '#AEBFDC',
                  boxShadow:
                    '0px 4px 6px -1px rgba(0, 0, 0, 0.1), 0px 2px 4px -2px rgba(0, 0, 0, 0.06)',
                }}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword2}
                      onMouseDown={handleMouseDownPassword2}
                      edge="end"
                    >
                      {showPassword2 ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Confirm Password"
              />
            </FormControl>
          </Box>
          <div className="ml-2">
            <FormControlLabel
              required
              control={<Checkbox />}
              label="Lembrar-me"
            />
          </div>
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
              variant="contained"
              sx={{ width: '223px', height: '4,5px' }}
            >
              Cadastrar
            </Button>
          </Stack>
          <div className={poppins.className}>
            <p className="text-center text-[#6A6A6A] mt-2">
              Já possui conta?<span className="text-[#292929] cursor-pointer">Entre aqui</span>
            </p>
          </div>
        </ThemeProvider>
      </Box>
    </form>
  )
}
