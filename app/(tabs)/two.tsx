import { FontAwesome } from "@expo/vector-icons";
import {
  CheckIcon,
  Checkbox,
  CheckboxIcon,
  CheckboxIndicator,
  CheckboxLabel,
  HStack,
  ScrollView,
  Text,
  VStack,
} from "@gluestack-ui/themed";
import React from "react";

import { gluestackUIConfig } from "../../config/gluestack-ui.config";

export default function Filter() {
  const primaryColor = gluestackUIConfig.tokens.colors.primary;
  return (
    <ScrollView bg="$darkBackground" flex={1} p="$4">
      <VStack bg="$mediumBackground" p="$4" space="md">
        <HStack space="md">
          <FontAwesome name="filter" size={24} color={primaryColor} />
          <Text bold color="$primary">
            Filtrar Lista
          </Text>
        </HStack>
        <Text bold color="$primary" size="sm">
          Streamings
        </Text>
        <HStack>
          <Text color="$text">Filtrando por seus streamings</Text>
          <Text color="$primary">(8)</Text>
        </HStack>
        <HStack>
          <Text color="$primary">Editar streamings</Text>
        </HStack>
        <Text color="$primary">Tipo</Text>
        <HStack>
          <Checkbox size="md">
            <CheckboxIndicator mr="$2">
              <CheckboxIcon as={CheckIcon} />
            </CheckboxIndicator>
            <CheckboxLabel>Label</CheckboxLabel>
          </Checkbox>
          <Text color="$text">Filme</Text>
          <Text color="$text">Série</Text>
          <Text color="$text">Minissérie</Text>
        </HStack>
        <Text color="$primary">Gênero</Text>
        <HStack flexWrap="wrap">
          <Text>Ação</Text>
          <Text>Ação</Text>
          <Text>Ação</Text>
          <Text>Ação</Text>
          <Text>Ação</Text>
          <Text>Ação</Text>
          <Text>Ação</Text>
          <Text>Ação</Text>
          <Text>Ação</Text>
          <Text>Ação</Text>
          <Text>Ação</Text>
          <Text>Ação</Text>
          <Text>Ação</Text>
          <Text>Ação</Text>
          <Text>Ação</Text>
          <Text>Ação</Text>
          <Text>Ação</Text>
          <Text>Ação</Text>
        </HStack>
      </VStack>
    </ScrollView>
  );
}
