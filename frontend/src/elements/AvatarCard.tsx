import { Card, Image, Text, Group, Badge, createStyles, Center, Button, Grid, CopyButton } from '@mantine/core';
import { FaTrashAlt, FaLink } from 'react-icons/fa';

const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
  },

  imageSection: {
    padding: theme.spacing.md,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottom: `1px solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,
  },

  label: {
    marginBottom: theme.spacing.xs,
    lineHeight: 1,
    fontWeight: 700,
    fontSize: theme.fontSizes.xs,
    letterSpacing: -0.25,
    textTransform: 'uppercase',
  },

  section: {
    padding: theme.spacing.md,
    borderTop: `1px solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,
  },

  icon: {
    marginRight: 5,
    color: theme.colorScheme === 'dark' ? theme.colors.dark[2] : theme.colors.gray[5],
  },
}));


interface AvatarCardProps {
    onDelete?: CallableFunction;
    isDefault: boolean;
    className: string;
    name: string;
    url: string;
}

export function AvatarCard({ name, url, className, isDefault, onDelete }: AvatarCardProps) {
  const { classes } = useStyles();

  return (
    <Card withBorder radius="md" className={classes.card + " " + className} h={375}>
      <Card.Section className={classes.imageSection} h={200}>
        <Image src={url} width={170} />
      </Card.Section>

      <Group position="apart" mt="md">
          <Text weight={500}>{name}</Text>
          <Text size="xs" color="dimmed">
            Free recharge at any station
          </Text>
      </Group>

      <Card.Section className={classes.section} h={50}>
        <Grid align="center">
            <CopyButton value={url}>
                {({ copied, copy }) => (<FaLink onClick={copy}></FaLink>)}
            </CopyButton>
            { isDefault && (
                <FaTrashAlt onClick={() => onDelete && onDelete()}></FaTrashAlt>)}
            { isDefault && (
                <Button radius="xl" style={{ flex: 2, marginLeft: 50 }}>
                    Set as default
                </Button>)}
        </Grid>
      </Card.Section>
    </Card>
  );
}