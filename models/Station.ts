/*
cacophony-api: The Cacophony Project API server
Copyright (C) 2020  The Cacophony Project

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as published
by the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

import Sequelize, { BuildOptions, ModelAttributes } from "sequelize";
import { ModelCommon, ModelStaticCommon } from "./index";

export type StationId = number;

export interface Station extends Sequelize.Model, ModelCommon<Station> {
  id: StationId;
  name: string;
  lat: number;
  lng: number;
  createdAt: Date;
  retiredAt: Date | null;
}

export interface StationStatic extends ModelStaticCommon<Station> {
  new (values?: object, options?: BuildOptions): Station;
  getAll: (where: any) => Promise<Station[]>;
  getFromId: (id: StationId) => Promise<Station | null>;
}
export default function (
  sequelize: Sequelize.Sequelize,
  DataTypes
): StationStatic {
  const name = "Station";
  const attributes: ModelAttributes = {
    name: {
      type: DataTypes.STRING
    },
    lat: {
      type: DataTypes.FLOAT
    },
    lng: {
      type: DataTypes.FLOAT
    },
    createdAt: {
      type: DataTypes.DATE
    },
    retiredAt: {
      type: DataTypes.DATE,
      allowNull: true
    }
  };

  // Define table
  const Station = (sequelize.define(
    name,
    attributes
  ) as unknown) as StationStatic;

  //---------------
  // CLASS METHODS
  //---------------

  Station.addAssociations = function (models) {
    models.Station.belongsTo(models.Group);
  };

  Station.getFromId = async function (id) {
    return this.findByPk(id);
  };
  return Station;
}
