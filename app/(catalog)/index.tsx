import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import _ from "lodash";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  Text,
  View,
} from "react-native";

import CatalogItem from "../../components/CatalogItem";
import DrawerFrame from "../../components/DrawerFrame";
import Filters, { FiltersType } from "../../components/Filters";
import FloatingActionButton from "../../components/FloatingActionButton";
import { CatalogItemContext } from "../../src/contexts";
import { useServer } from "../../src/hooks";
import { palette } from "../../src/theme/colors";
import s from "../../src/theme/styles";
import { CatalogItemData, Playlist, PlaylistType } from "../../src/types";

type CatalogResponse = {
  onboarding: Onboarding;
  total: number;
  playlists: Playlist[];
  items: CatalogItemData[];
};

type Onboarding = {
  currentRatings: number;
  targetRatings: number;
} | null;

export default function () {
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [items, setItems] = useState<CatalogItemData[]>([]);
  const [onboarding, setOnboarding] = useState<Onboarding>(null);
  const [visible, setVisible] = useState(false);
  const [filters, setFilters] = useState<FiltersType>({});

  const willExpand = items.some((item) => !item.showOverview);

  const server = useServer();

  useEffect(() => {
    loadCatalog();
  }, [filters]);

  if (loading) {
    return (
      <View style={s.center}>
        <ActivityIndicator color={palette.primary} size="large" />
      </View>
    );
  }

  return (
    <DrawerFrame title="Catálogo">
      <FlatList
        style={[s.flex1, s.p3]}
        contentContainerStyle={s.g3}
        data={items}
        stickyHeaderIndices={onboarding ? [0] : undefined}
        keyExtractor={(item) => item._id.toString()}
        onEndReached={() => loadCatalog()}
        onRefresh={() => refreshCatalog()}
        refreshing={loading}
        ListHeaderComponent={() => (
          <Header total={total} onboarding={onboarding} />
        )}
        renderItem={({ item }) => (
          <CatalogItemContext.Provider
            key={item._id}
            value={{
              item,
              playlists,
              addPlaylist: (id, name) => {
                setPlaylists([
                  ...playlists,
                  { _id: id, name, type: PlaylistType.CUSTOM },
                ]);
              },
              deletePlaylist: (id) => {
                setPlaylists(
                  playlists.filter((playlist) => playlist._id !== id),
                );
              },
              setItemPlaylists: (playlistsIds: string[]) => {
                item.playlists = playlistsIds;
                setItems([...items]);
              },
              showOverview: (show) => {
                const actionItem = items.find(
                  (actionItem) => actionItem._id === item._id,
                );
                if (!actionItem) return;

                actionItem.showOverview = show;
                setItems([...items]);
              },
              rate: (stars) => rateItem(item._id, stars),
            }}
          >
            <CatalogItem />
          </CatalogItemContext.Provider>
        )}
      />

      <FloatingActionButton
        actions={[
          {
            text: "Atualizar recomendações",
            icon: <MaterialCommunityIcons name="reload" />,
            action: () => refreshCatalog(),
          },
          {
            text: "Filtrar catálogo",
            icon: <MaterialCommunityIcons name="filter" />,
            action: () => setVisible(true),
          },
          {
            text: willExpand ? "Exibir sinopses" : "Ocultar sinopses",
            icon: <MaterialIcons name="remove-red-eye" />,
            action: () =>
              setItems(
                items.map((item) => ({ ...item, showOverview: willExpand })),
              ),
          },
        ]}
      />

      {visible && (
        <Filters
          filters={filters}
          onFilter={(filters) => {
            setVisible(false);
            refreshCatalog(filters);
          }}
        />
      )}
    </DrawerFrame>
  );

  async function loadCatalog() {
    const response = await server.post<CatalogResponse>("/catalog", {
      ...filters,
      skip: items.map((item) => item._id),
    });

    const data = response.data;

    setTotal(data.total);
    setPlaylists(data.playlists);
    setItems([...items, ...data.items]);
    setOnboarding(data.onboarding);
    setLoading(false);
  }

  function refreshCatalog(applyFilters?: FiltersType) {
    setItems([]);
    setLoading(true);
    setFilters({ ...(applyFilters || filters) });
  }

  async function rateItem(itemId: string, starClicked: number) {
    const item = items.find((item) => item._id === itemId);
    if (!item) return;

    const hadRating = !!item.ratings.user;

    const stars = item.ratings.user === starClicked ? undefined : starClicked;
    const hasRating = !!stars;

    server.post(`/catalog/${itemId}/rate`, { stars });

    item.ratings.user = stars;
    setItems([...items]);

    if (!_.isNull(onboarding)) {
      let increment = 0;
      if (!hadRating && hasRating) increment++;
      if (hadRating && !hasRating) increment--;

      const currentRatings = onboarding.currentRatings + increment;
      setOnboarding({ ...onboarding, currentRatings });
    }
  }
}

function Header(props: { total: number; onboarding: Onboarding }) {
  if (props.onboarding) {
    return (
      <View style={[s.bgMedium, s.borderPrimary, s.b0, s.r3, s.my3, s.p3]}>
        <Text style={[s.textBold]}>
          <Text style={[s.textStrong]}>
            Avalie ao menos {props.onboarding.targetRatings} itens que já
            assistiu.
          </Text>{" "}
          Quanto mais itens avaliar, melhores recomendações vai receber. Você já
          avaliou{" "}
          <Text style={[s.textStrong]}>{props.onboarding.currentRatings}</Text>{" "}
          {props.onboarding.currentRatings === 1 ? "filme" : "filmes"}.
        </Text>

        {props.onboarding.currentRatings >= props.onboarding.targetRatings && (
          <Pressable>
            <Text style={[s.textStrong, s.taCenter, s.py4]}>
              VER RECOMENDAÇÕES
            </Text>
          </Pressable>
        )}
      </View>
    );
  }

  return (
    <Text style={[s.text, s.my3]}>
      Ordenamos <Text style={s.textStrong}>{props.total}</Text>{" "}
      {props.total === 1 ? "item" : "itens"} conforme o seu perfil
    </Text>
  );
}
