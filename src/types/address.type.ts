export interface IProvince {
  _id: string;
  name: string;
  code: number;
  codename: string;
  division_type: string;
  phone_code: number;
}
export interface IDistrict {
  _id: string;
  name: string;
  code: number;
  codename: string;
  division_type: string;
  short_codename: string;
  province_code: number;
}
export interface IWard {
  _id: string;
  name: string;
  code: number;
  codename: string;
  division_type: string;
  short_codename: string;
  district_code: number;
}
