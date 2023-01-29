import { useToggle, upperFirst } from '@mantine/hooks';
import { useForm } from '@mantine/form';
import {
    TextInput,
    PasswordInput,
    Text,
    Paper,
    Group,
    PaperProps,
    Button,
    Divider,
    Checkbox,
    Anchor,
    Stack,
    createStyles,
    Container,
} from '@mantine/core';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const useStyles = createStyles((theme) => ({
    auth: {
      maxWidth: 1000,
    },
}));

export function AuthenticationForm(props: PaperProps) {
    const { classes } = useStyles();
    const auth = useAuth()
    const navigate = useNavigate()
    const [processing, setProcessing] = useState<boolean>(false)
    const [type, toggle] = useToggle(['login', 'register']);

    const form = useForm({
        initialValues: {
            email: '',
            name: '',
            password: '',
            terms: true,
        },

        validate: {
            email: (val: string) => (/^\S+@\S+$/.test(val) ? null : 'Invalid email'),
            password: (val: string) => (val.length <= 6 ? 'Password should include at least 6 characters' : null),
        },
    });

    const login = async () => {
        setProcessing(true)
        await auth.login(form.values.email, form.values.password)
        setProcessing(false)
    }

    const register = async () => {
        setProcessing(true)
        const response = (
          await fetch('/api/auth/register', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: form.values.email, password: form.values.password }),
          })
        ).json()
        console.log(response)
        setProcessing(false)
        navigate('/activate')
      }
    
    if (auth.isAuthenticated) {
        navigate('/')
        return <div>Already logged in. Redirecting you to the home page...</div>
    }

    return (
        <Container>
            <Paper radius="md" p="xl" withBorder className={classes.auth} {...props}>
                <Text size="lg" weight={500}>
                    Welcome to Mantine, {type} with
                </Text>

                <form onSubmit={form.onSubmit(() => (type === 'register' ? register : login)())}>
                    <Stack>
                        {type === 'register' && (
                            <TextInput
                                label="Name"
                                placeholder="Your name"
                                value={form.values.name}
                                onChange={(event) => form.setFieldValue('name', event.currentTarget.value)}
                            />
                        )}

                        <TextInput
                            required
                            label="Email"
                            placeholder="hello@mantine.dev"
                            value={form.values.email}
                            onChange={(event) => form.setFieldValue('email', event.currentTarget.value)}
                            error={form.errors.email && 'Invalid email'}
                        />

                        <PasswordInput
                            required
                            label="Password"
                            placeholder="Your password"
                            value={form.values.password}
                            onChange={(event) => form.setFieldValue('password', event.currentTarget.value)}
                            error={form.errors.password && 'Password should include at least 6 characters'}
                        />

                        {type === '__register' && (
                            <Checkbox
                                label="I accept terms and conditions"
                                checked={form.values.terms}
                                onChange={(event) => form.setFieldValue('terms', event.currentTarget.checked)}
                            />
                        )}
                    </Stack>

                    <Group position="apart" mt="xl">
                        <Anchor
                            component="button"
                            type="button"
                            color="dimmed"
                            onClick={() => toggle()}
                            size="xs"
                        >
                            {type === 'register'
                                ? 'Already have an account? Login'
                                : "Don't have an account? Register"}
                        </Anchor>
                        <Button type="submit">{upperFirst(type)}</Button>
                    </Group>
                </form>
            </Paper>
        </Container>
    );
}