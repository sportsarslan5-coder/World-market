import { Product, Customer, Currency, Language, SellerInfo, BlogPost } from './types';

export const ADMIN_WHATSAPP = "923187536795"; 

export const CURRENCIES: Currency[] = [
  { code: 'USD', symbol: '$', rate: 1, name: 'United States Dollar' },
  { code: 'EUR', symbol: '€', rate: 0.92, name: 'Euro' },
  { code: 'GBP', symbol: '£', rate: 0.79, name: 'British Pound' },
  { code: 'AED', symbol: 'د.إ', rate: 3.67, name: 'UAE Dirham' },
  { code: 'PKR', symbol: 'Rs', rate: 278, name: 'Pakistani Rupee' },
];

export const LANGUAGES: Language[] = [
  { code: 'en', name: 'English', flag: '🇺🇸', dir: 'ltr' },
  { code: 'ar', name: 'Arabic', flag: '🇦🇪', dir: 'rtl' },
  { code: 'fr', name: 'French', flag: '🇫🇷', dir: 'ltr' },
  { code: 'es', name: 'Spanish', flag: '🇪🇸', dir: 'ltr' },
  { code: 'de', name: 'German', flag: '🇩🇪', dir: 'ltr' },
];

export const CATEGORIES = [
  "Clothing", "Shoes", "Sportswear", "Bags", "Outdoor", "Accessories", "Electronics Accessories"
];

export const SHIPPING_COUNTRIES = [
  "United States", "United Kingdom", "United Arab Emirates", "Pakistan", "Germany", "France", "Spain", "Canada", "Australia"
];

export const SELLERS: SellerInfo[] = [
  {
    id: 'seller-1',
    fullName: 'Global Sportswear Mfg',
    whatsapp: '923187536795',
    email: 'mfg@worldmarket.com',
    country: 'Pakistan',
    city: 'Sialkot',
    contactNumber: '+92 318 7536795',
    paymentDetails: 'Bank Transfer / JazzCash',
    showName: 'globalsports',
    rank: 'Gold',
    rating: 4.9,
    totalSales: 1250,
    responseTime: '< 1 hour',
    isVerified: true,
    joinedDate: '2023-01-15',
    balance: 4500.50
  },
  {
    id: 'seller-2',
    fullName: 'Elite Apparel Co.',
    whatsapp: '923001234567',
    email: 'elite@worldmarket.com',
    country: 'United Arab Emirates',
    city: 'Dubai',
    contactNumber: '+971 50 123 4567',
    paymentDetails: 'Bank Transfer / IBAN',
    showName: 'eliteapparel',
    rank: 'Silver',
    rating: 4.2,
    totalSales: 450,
    responseTime: '< 4 hours',
    isVerified: true,
    joinedDate: '2023-06-20',
    balance: 1200.00
  }
];

const CLOUDINARY_IMAGES = [
  "https://res.cloudinary.com/dzt2nrkjr/image/upload/v1770048123/FD-163_FD-5060_u9c4nk.png",
  "https://res.cloudinary.com/dzt2nrkjr/image/upload/v1770048123/FD-BASE-VN2-3444-nLxSniE19uaW_alt_3_x1e3hs.png",
  "https://res.cloudinary.com/dzt2nrkjr/image/upload/v1770048122/iw4bvdxfzz7ak15hcgrm_cqn51z.jpg",
  "https://res.cloudinary.com/dzt2nrkjr/image/upload/v1770048125/aHR0cHM6Ly9zdG9yYWdlLmdvb2dsZWFwaXMuY29tL2dhbWVjb2Nrc29ubGluZS1jb20vMjAyNi8wMS9hMDQ5ZmIxNS1ic2JfMDEyM19wcmFjdGljZV9kYXZpc18yNl81OS5qcGc_iy4soz.png",
  "https://res.cloudinary.com/dzt2nrkjr/image/upload/v1770054975/250px-Uniforme_local_ialcqx.jpg",
  "https://res.cloudinary.com/dzt2nrkjr/image/upload/v1770054977/2024_Major_League_Baseball_uniform_controversy__28cropped_29_vbgtfr.jpg",
  "https://res.cloudinary.com/dzt2nrkjr/image/upload/v1770054977/new-index-bat-bags-grid-fall-2025-3_igkuhe.jpg",
  "https://res.cloudinary.com/dzt2nrkjr/image/upload/v1770054977/Cam_Cannarella_JohnByrumGetty_efpobp.jpg",
  "https://res.cloudinary.com/dzt2nrkjr/image/upload/v1770055149/2026_BASE_LeggettNo7Legacy_FRONT_rkrgpu.webp",
  "https://res.cloudinary.com/dzt2nrkjr/image/upload/v1770054613/2_811d056b-a34e-49ea-b42f-6595878871c4_800x_kj2kke.jpg",
  "https://res.cloudinary.com/dzt2nrkjr/image/upload/v1770054614/American-Football-700-9_vpggpv.jpg",
  "https://res.cloudinary.com/dzt2nrkjr/image/upload/v1770054612/16AMERICANFOOTBALLMODEL_swj02j.jpg",
  "https://res.cloudinary.com/dzt2nrkjr/image/upload/v1770056439/image.coreimg_szfvyx.jpg",
  "https://res.cloudinary.com/dzt2nrkjr/image/upload/v1770056399/Hawaii_AirForce_Web_Captians_f52wrm.webp",
  "https://res.cloudinary.com/dzt2nrkjr/image/upload/v1770056398/240917-american-sports-story-al-0928-5de7fc_xhcoqy.jpg",
  "https://res.cloudinary.com/dzt2nrkjr/image/upload/v1770056397/01_08_34_15_gla_103_rec709_g24_20_3840x2160_20240726_0098751-copy-4-copy_lksoe4.jpg",
  "https://res.cloudinary.com/dzt2nrkjr/image/upload/v1770056364/jerseys_j0kxki.jpg",
  "https://res.cloudinary.com/dzt2nrkjr/image/upload/v1770056366/american-football-player-uniform-training-field_23-2150034543_w6cmwh.jpg"
];

const HOODIE_IMAGES = [
  "https://res.cloudinary.com/dsaydvr5t/image/upload/v1771351412/0A658C28-3B89-4DEF-9F51-C2A284CF18DF_1100x_gk1duj.jpg",
  "https://res.cloudinary.com/dsaydvr5t/image/upload/v1771351414/4c2d1df8c4b94412accc81c20d3d158a_tplv-fhlh96nyum-crop-webp_400_400_wsvztf.webp",
  "https://res.cloudinary.com/dsaydvr5t/image/upload/v1771351412/Wholesale-Crocodile-Print-Loose-Vintage-Hoodies-Fashion-Hoodies-for-Men-and-Women_vh1gbs.webp",
  "https://res.cloudinary.com/dsaydvr5t/image/upload/v1771351456/9e8ef7d07837b6de8339aa6a914be763.jpg_960x960q80.jpg__reemoy.webp",
  "https://res.cloudinary.com/dsaydvr5t/image/upload/v1771351468/images_dttwiw.webp",
  "https://res.cloudinary.com/dsaydvr5t/image/upload/v1771351410/2da7759d-8c31-4a3c-a534-a1ef6561e37b_flqzeu.jpg",
  "https://res.cloudinary.com/dsaydvr5t/image/upload/v1771351410/Zip-Up-Hoodies-Men-Green-Camouflage-Classic-Long-Sleeve-Comfrt-Men-S-Fashion-Sweatshirts-Jackets-Pullover-Clothing-Clothes-Pouch_3c48b80e-34ec-42fd-95d2-d49dd6a566cb.32de5d276ac005481efeaeec6bb473bb_kzsiqv.jpg",
  "https://res.cloudinary.com/dsaydvr5t/image/upload/v1771351410/Zip-Hoodies-Men-Striped-Meat-Long-Sleeve-Comfrt-Men-S-Fashion-Hoodies-Sweatshirts-Jackets-Men-Hoodies-Pullover-Clothing-Clothes-Pouch_f5cf6790-1e1f-478d-8cf0-d250a2f04393.2aa30894a63f2bc9ebd8ad7423bae6fd_tqtmrg.jpg",
  "https://res.cloudinary.com/dsaydvr5t/image/upload/v1771351411/trendy-sweatshirts-296101-1635892685587-square-1200-80_qftafj.jpg",
  "https://res.cloudinary.com/dsaydvr5t/image/upload/v1771351412/Hoodies-Men-Chocolate-Chunk-Brown-Print-Long-Sleeve-Comfrt-Men-S-Fashion-Hoodies-Sweatshirts-Sweatshirts-Men-Hoodies-Pullover-Clothing-Clothes-Pouch_312d6005-5338-4f2e-87d9-c779bedea599.561810f300cda7558080e9e759d16f64_cyqzyz.jpg",
  "https://res.cloudinary.com/dsaydvr5t/image/upload/v1771351398/s-l400_rx5ozt.jpg",
  "https://res.cloudinary.com/dsaydvr5t/image/upload/v1771351399/Latest-2024-model-Men-s-Hoodies-Sweatshirts-Mens-Casual-Relaxed-Comfortable-Designer-Men-Printed-Long-Sleeved-Hoodie-Anime-Crop-Top-Matching-Cool_4c4b53e2-d317-4e61-a569-e4decd5e8b33.80371620230ca054ef49303440eaca61_xm6j9p.jpg",
  "https://res.cloudinary.com/dsaydvr5t/image/upload/v1771351400/31aef45e77306404733a30ffbdd825ad_ltvryj.jpg",
  "https://res.cloudinary.com/dsaydvr5t/image/upload/v1771351400/fashion-hoodies-500x500_tt392c.jpg",
  "https://res.cloudinary.com/dsaydvr5t/image/upload/v1771351406/1_rjqKlpFTUcgWmfF_SPWVqQ_p6eqdi.jpg",
  "https://res.cloudinary.com/dsaydvr5t/image/upload/v1771351395/41UJBrgmETL._SY1000__wzm7ix.jpg",
  "https://res.cloudinary.com/dsaydvr5t/image/upload/v1771351396/s-l1200_q6139b.jpg",
  "https://res.cloudinary.com/dsaydvr5t/image/upload/v1771351396/619-bSQ8_QL._AC_UY1000__xdvukt.jpg",
  "https://res.cloudinary.com/dsaydvr5t/image/upload/v1771351396/Ccpelsie-Hoodies-for-Girl-Cropped-Sweatshirts-Fall-Fashion-Outfits-Y2k-Fleece-Toddler-Girls-Clothes-Purple-7-8-Y_3c2c6312-f4cf-4c91-9993-4088bf2cd11e.89a650bbab367f82ab49ed6780f84e51_hpxqoh.jpg",
  "https://res.cloudinary.com/dsaydvr5t/image/upload/v1771351396/52ca4f27-3274-45e2-ba76-3ca3dfd94caa_tpmqmu.webp",
  "https://res.cloudinary.com/dsaydvr5t/image/upload/v1771351385/662a7db097cb0815e6316a52-yeahitch-men-s-fashion-hoodies_jsoiqh.jpg",
  "https://res.cloudinary.com/dsaydvr5t/image/upload/v1771351393/61qoF9RYOML._AC_UY1000__hg4fbq.jpg",
  "https://res.cloudinary.com/dsaydvr5t/image/upload/v1771351393/6b8e1f1a482362ac5d19b86535f2e9f8.jpg_720x720q80_igwzir.jpg",
  "https://res.cloudinary.com/dsaydvr5t/image/upload/v1771351394/be8779aa-cb56-4484-9fba-290645ba4771_rmxrok.jpg",
  "https://res.cloudinary.com/dsaydvr5t/image/upload/v1771351394/6609fc74b2dc5a3831523886-full-zip-hoodies-for-men-over-face-y2k_yononh.jpg",
  "https://res.cloudinary.com/dsaydvr5t/image/upload/v1771351383/61KzcH-vRML._UY1000__pbsd0z.jpg"
];

const TRACKSUIT_IMAGES = [
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1770780568/superstar-firozi-and-navy-scaled_ilhzar.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1770780565/set-design-dept-tracksuit-1.224.20.01-000000-fullbody-04_f6xdrw.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1770780565/M_NK_CLUB_PK_TRK_SUIT_npejt8.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1770780564/bded68cd-7c03-43c6-affb-fbcfd593b2071681468037192-ADIDAS-Men-Tracksuits-3851681468036045-1_noiusc.webp",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1770780564/aefa39b6c0f6ec9974f76efba34e177c0e8acce2_VENUM_05299_004_G_1_unhc9h.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1770780539/K_NK_DF_ACD25_TRACK_SUIT_K_-PD_yp4brx.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1770780539/TA-CZIPHOOD01-W-BL_TA-CWJOG01-W-BL-13_vw3ruc.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1770780544/ac9d6b51-c0d0-49b9-bb1d-1bddfb6591b21732339636335-ADIDAS-Women-Tracksuits-5251732339635628-1_ukqvuu.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1770780544/WINE-VELVET-TWIN-SIDE-STRIPE-HOODED-SKINNY-TRACKSUIT-11.jpg_fcgv2j.webp",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1770780564/ruched-sleeve-cropped-grey-tracksuit-styledup-fashion_gih769.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1770780437/womens-designer-tracksuit-luxury-tracksuit-antoninias-2-29774180417780_t70dgp.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1770780487/Black-Winter-Tracksuit-For-men_mdfi4k.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1770780487/110005366_LIQUORICE_3_06bad7ca-addb-412d-ba0d-085bb938ae79_agmrnd.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1770780487/7779f63e-f34d-49d2-b92d-060564cc13b5.cc498afed33613c2d2a62beffc086645_kwxr4p.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1770780488/IMG_0141_JPG_y3hlxg.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1770780383/915625s_dkibap.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1770780384/27805864_1200_B_atbjes.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1770780384/D36887s_gzztwd.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1770780387/SeaGreenCoordSet_yeehaq.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1770780335/LP_-715_tgbjnx.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1770780357/ultralight_tracksuit_set_01_2_da893o.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1770780368/M_NK_CLUB_WVN_TRK_SUIT_cgeoxv.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1770780383/68593905023438e95303bf63-tbmpoy-mens-tracksuits-sweatsuits-for_i8jvnz.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1770780334/250px-Jude_Bellingham_during_an_EA_Sports_event_in_September_2024_2_tlfpuh.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1770780334/womens-designer-tracksuit-luxury-tracksuit-antoninias-1-29774180352244_vyxl7y.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1770780335/yUBQ1W0qYS5TY1h2nRN_AbiJahShGz-eiiO-AmZFiAg_io8hha.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1770780335/LP_-715_tgbjnx.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1770780357/ultralight_tracksuit_set_01_2_da893o.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1770780304/AS_M_NK_CLUB_PK_TRK_SUIT_rzwccm.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1770780307/B5BYSqG1Wi_7IwW4xyFiycnSo6XF8762LO7PN-UCeHQ_t0idvb.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1770780333/100250911_F_Model_eCom_yngixz.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1770780333/Nextage-navy_bluetracksuit-mens_be57u3.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1770780334/AS_M_NK_CLUB_WVN_TRK_SUIT_u6tehf.png",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1770780303/VG-NVRHO32CJ-W_VG-NVRJO33CJ-W-P-S-44_5bbfc92e-956e-4f83-8f4f-b3662a5a0918_kbnmmu.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1770780304/227090-6195_A_nwasrj.png",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1770780304/91w5WFHdRCL_mj19gw.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1770780304/M_NRG_NOCTA_CS_PANT_FLC_OH_dhs60f.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1770780304/AS_M_NK_CLUB_PK_TRK_SUIT_rzwccm.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1770780263/102.181992_80013_00_HR_vjg0it.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1770780263/xTV7O0lxB3NjTub2zVGhF0usvyQZubVKVc6jKGBMyy4_twdqsd.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1770780264/102.180957_60024_10_HR_msy2gj.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1770780264/c42cf4bff71d46c9ab1ad1c8a1e5c3ce_zhuw1w.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1770780303/SH-MAYTRKJK02-W-GR_SH-WTRACKP-W-G-12_9a1af220-420c-4b57-968a-42f61c51ffe9_ylzyho.jpg"
];

const POLO_IMAGES = [
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1772096512/11390304-WHIT_alamna.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1772096517/1b9649bb87faed7e096cdea7dcb366fa_mhrtki.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1772096534/MC1511_p6ga9f.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1772096535/-473Wx593H-410456774-wht-MODEL_zb7bda.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1772096538/0W2A6470_puhz1i.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1772096479/U-S-Polo-Assn-Men-s-Short-Sleeve-Crew-T-Shirt_b4b79b71-4740-49e6-9604-dd3f02e690d8.6cd8285b5c3adce8062b5aa8f6fa1968_ii8emp.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1772096479/black-ash_bocsml.webp",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1772096480/5_vJgp79x_dru5na.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1772096511/NavyBlueCPModel_7826c75b-86ce-4ab0-8d44-4540c2c0e4e4_jdzl8j.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1772096512/2240101914-19-38_1_ndni7m.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1772096465/WUTS1125S_1_hc5foh.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1772096478/blank-collared-shirt-mock-up-template-front-and-back-view-plain-white-t-shirt-isolated-on_mz9tej.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1772096478/white-polo-shirt-mockup-png_atiomm.png",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1772096479/7_a4d3182c-987e-4147-aba4-cdd044567da3_uokirf.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1772096479/67e0d3b7bd774b5a6c68cfd0-button-down-t-shirts-for-mens-polo_pzwspn.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1772096441/polo-t-shirt-559323_skfias.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1772096441/outfmvch-polo-shirts-for-men-male-summer-solid-print-t-shirt-turn-down-collar-short-sleeve-t-shirt-womens-tops-grey_fd5b3fa8-56d4-40a7-8b6f-ec1307b752ab.b1927c945864aa1de64664f019e9205f_eozbfl.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1772096442/6209244-HQ154602-SPWIN24130424_01-2100_h8jnmv.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1772096442/TS-11-1_xszvqq.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1772096442/202303-2210-468-model-fv-1_4b5f4fe7-abcd-453d-945a-50aed27f323b_q9fmr8.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1772096407/nologo-navy-pure-cotton-polo-t-shirt_qzoqb4.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1772096365/711268-14605036_yhhcyu.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1772096367/grey-polo-shirt-mockup-front-used-as-design-template-tee-shirt-blank-isolated-on-white_ebofe8.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1772096406/K90236s_fc4htm.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1772096406/blank-black-t-shirt-template-front-and-back-view_k2img1.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1772096406/white-polo-t-shirt-mockup-template-medium-re-design-4964ba095ea76fb3449a6b4937f73618_screen_sdfi56.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1772096362/GhostMannequinsPOLOBlack_x600_ge3nnk.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1772096362/7684e8af4b3d912d447a4d780ac85799f2167fa24564a0faf6d46f2297fd937f_woyaay.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1772096363/MC1511_m05thm.jpg"
];

const SNEAKER_IMAGES = [
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1772098463/0097603260303NEW_00_052_rrewhl.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1772098462/unisex-staple-t-shirt-black-front-6539555f90a93_uxb5q7.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1772098410/Black-Front_f7fa258b-d95c-490e-acb8-61068ede2088_gdkyju.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1772098360/61JANzsUXQL._AC_UY1000__ek0exu.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1772098359/cbum_gymthark_new_vytoqv.png",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1772098360/images-FadeGraphicT_ShirtGSBlackA4C1V_BB2J_0737_V2_3840x_uebpiu.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1772098368/900749701_g0_nlkv0y.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1772098379/mens_reflections_vintage_inspired_triblend_gold_tee_shirt_with_cool_colorful_lake_graphic_1600x_eiw5sw.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1772098307/goods_09_479030_3x4_wrg52p.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1772098307/unisex-staple-t-shirt-black-front-6536f14d08c7a_2048x_pdflhr.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1772098307/873730228-dynamic1-pdp_ock6zr.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1772098312/161431507-dynamic1-pdp_kvesvi.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1772098359/image_dd0n4d.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1772098306/71aJNnIUSBL._AC_UY1000__xfryxs.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1772098306/61xrPXnaTSL._AC_UY1000__lzk4ui.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1772098306/71QMsrys-lL._AC_UY1000__zlmg7e.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1772098307/161431509-dynamic1-pdp_iv6dxi.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1772098307/mens_take_it_slow_vintage_inspired_triblend_kelly_with_cool_funny_turtle_graphic_on_model_1600x_oqun6b.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1772098305/volt-dragon-heavyweight-mens-graphic-tshirt-1_fxpzgh.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1772098305/ClevelandArtworkTshirtBack_smpjwr.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1772098305/61ETIupdWLL._AC_UY1000__xrohof.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1772098306/FD207245-CREA_MAIN_n81lak.png",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1772098306/DP0629202313020933M_hql5hy.jpg"
];

const BOOT_IMAGES = [
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1772101784/799665_10_uwhewx.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1772101745/the-low-down-on-chelsea-boots-2_qjriex.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1772101786/1080x1350_0003_WG81_Dodo_1316_Blackstone_AW25_gzdvkq.png",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1772101786/0000s_0031_DSC06106.ARW_t7nb0z.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1772101817/ChelseaBootGROUP_LR_rf5pwg.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1772101694/MF-2002-BRO_Pair_Front_kbgv1o.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1772101695/0000s_0033_DSC06108.ARW_x3lcih.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1772101695/778745_06_r20_ud1oqo.jpg",
  "https://res.cloudinary.com/dc0ytviey/image/upload/v1772101722/0000s_0043_DSC06118.ARW_ulmtuk.jpg"
];

const NEW_HOODIES: Product[] = HOODIE_IMAGES.map((img, idx) => ({
  id: `hoodie-${idx}`,
  name: `Urban Elite Fashion Hoodie #${idx + 101}`,
  category: "Clothing",
  price: [49, 52, 55, 58, 61][idx % 5],
  rating: 4.8,
  stock: 45,
  description: `Experience ultimate comfort with our Urban Elite Fashion Hoodie. Designed for the modern trendsetter, this hoodie combines premium materials with a sleek aesthetic. Perfect for casual outings or lounging in style.
  
  ### Features:
  - Ultra-soft fleece lining
  - Adjustable drawstring hood
  - Spacious kangaroo pocket
  - Ribbed cuffs and hem for a perfect fit
  
  **Material:** 100% Organic Cotton
  **Shipping:** Express worldwide shipping. Tracking provided.`,
  image: img,
  images: [img],
  datePosted: new Date().toISOString(),
  fabric: "100% Organic Cotton",
  quality: "Premium",
  sizes: ['S', 'M', 'L', 'XL', 'XXL'],
  colors: ['Black', 'Midnight Blue', 'Heather Grey', 'Forest Green'],
  shippingCountry: "Worldwide",
  sellerId: 'seller-1',
  sales: 240,
  badges: ['Best Seller', 'Trending Product'],
  metaTitle: `Urban Elite Fashion Hoodie - Premium Streetwear | World Market`,
  metaDescription: `Shop our Urban Elite Fashion Hoodie. Premium cotton, worldwide shipping, and modern design. Best seller in streetwear.`,
  metaKeywords: `hoodie, fashion hoodie, streetwear, organic cotton hoodie, premium clothing`,
  imageAlt: `Urban Elite Fashion Hoodie Style ${idx + 1}`
}));

const NEW_TRACKSUITS: Product[] = TRACKSUIT_IMAGES.map((img, idx) => ({
  id: `tracksuit-${idx}`,
  name: `Pro-Performance Athletic Tracksuit #${idx + 201}`,
  category: "Sportswear",
  price: [69, 72, 75, 79, 82][idx % 5],
  rating: 4.9,
  stock: 30,
  description: `Dominate your workout or travel in comfort with the Pro-Performance Athletic Tracksuit. Engineered with moisture-wicking technology to keep you dry and comfortable.
  
  ### Features:
  - Breathable, high-stretch fabric
  - Full-zip jacket with secure pockets
  - Tapered joggers with adjustable waistband
  - Reflective details for low-light visibility
  
  **Material:** 90% Polyester, 10% Spandex
  **Shipping:** Fast global delivery from our Sialkot manufacturing hub.`,
  image: img,
  images: [img],
  datePosted: new Date().toISOString(),
  fabric: "Performance Tech Blend",
  quality: "Export Quality",
  sizes: ['S', 'M', 'L', 'XL', 'XXL'],
  colors: ['Navy/White', 'Black/Red', 'Grey/Black', 'Royal Blue'],
  shippingCountry: "Worldwide",
  sellerId: 'seller-1',
  sales: 510,
  badges: ['Best Seller', 'Limited Stock'],
  metaTitle: `Pro-Performance Athletic Tracksuit - Teamwear & Training | World Market`,
  metaDescription: `High-performance tracksuits for athletes. Moisture-wicking fabric, durable design, and factory-direct pricing.`,
  metaKeywords: `tracksuit, athletic wear, training suit, sportswear, performance clothing`,
  imageAlt: `Pro-Performance Tracksuit Model ${idx + 1}`
}));

const NEW_POLOS: Product[] = POLO_IMAGES.map((img, idx) => ({
  id: `polo-${idx}`,
  name: `Classic Heritage Polo Shirt #${idx + 301}`,
  category: "Clothing",
  price: [25, 28, 30, 33, 35][idx % 5],
  rating: 4.7,
  stock: 100,
  description: `The Classic Heritage Polo Shirt is a timeless staple for any wardrobe. Featuring a refined fit and breathable pique knit, it transitions seamlessly from the office to the weekend.
  
  ### Features:
  - Breathable pique cotton knit
  - Classic two-button placket
  - Signature embroidered logo
  - Fade-resistant colors
  
  **Material:** 100% Pique Cotton
  **Shipping:** Standard and Express options available globally.`,
  image: img,
  images: [img],
  datePosted: new Date().toISOString(),
  fabric: "100% Pique Cotton",
  quality: "Premium",
  sizes: ['S', 'M', 'L', 'XL', 'XXL'],
  colors: ['White', 'Black', 'Navy', 'Sky Blue', 'Burgundy'],
  shippingCountry: "Worldwide",
  sellerId: 'seller-2',
  sales: 890,
  badges: ['Trending Product'],
  metaTitle: `Classic Heritage Polo Shirt - Timeless Men's Fashion | World Market`,
  metaDescription: `Shop our collection of Classic Heritage Polo Shirts. 100% Pique cotton, breathable and stylish. Factory direct.`,
  metaKeywords: `polo shirt, men's polo, pique cotton, classic fashion, collared shirt`,
  imageAlt: `Classic Heritage Polo Shirt Color ${idx + 1}`
}));

const NEW_SNEAKERS: Product[] = SNEAKER_IMAGES.map((img, idx) => ({
  id: `sneaker-${idx}`,
  name: `Sneakers #${idx + 401}`,
  category: "Shoes",
  price: [25, 28, 30, 32, 38][idx % 5],
  rating: 4.9,
  stock: 15,
  description: `Premium quality sneakers designed for style and comfort. Perfect for everyday wear and athletic activities.
  
  ### Features:
  - Durable construction
  - Comfortable fit for all-day use
  - Modern aesthetic design
  - High-quality materials
  
  **Material:** Premium Blend
  **Shipping:** Securely packaged and shipped worldwide with insurance.`,
  image: img,
  images: [img],
  datePosted: new Date().toISOString(),
  fabric: "Premium Materials",
  quality: "Premium",
  sizes: ['38', '39', '40', '41', '42', '43', '44', '45'],
  colors: ['Black', 'White', 'Grey', 'Multi-color'],
  shippingCountry: "Worldwide",
  sellerId: 'seller-2',
  sales: 320,
  badges: ['Best Seller'],
  metaTitle: `Sneakers - Premium Footwear | World Market`,
  metaDescription: `Shop our collection of premium sneakers. Stylish, comfortable, and durable. Worldwide shipping available.`,
  metaKeywords: `sneakers, shoes, footwear, fashion shoes, comfortable sneakers`,
  imageAlt: `Sneakers Style ${idx + 1}`
}));

const NEW_BOOTS: Product[] = BOOT_IMAGES.map((img, idx) => ({
  id: `boot-${idx}`,
  name: `Signature Suede Chelsea Boots #${idx + 501}`,
  category: "Shoes",
  price: [119, 125, 130, 135, 140][idx % 5],
  rating: 4.8,
  stock: 10,
  description: `Add a touch of sophistication to your look with our Signature Suede Chelsea Boots. Handcrafted from premium suede with a classic silhouette that never goes out of style.
  
  ### Features:
  - Premium Italian suede upper
  - Elastic side panels for easy entry
  - Durable pull tabs
  - Cushioned leather insole
  
  **Material:** Genuine Suede Leather
  **Shipping:** Premium shipping in protective boxes. Worldwide delivery.`,
  image: img,
  images: [img],
  datePosted: new Date().toISOString(),
  fabric: "Genuine Suede Leather",
  quality: "Export Quality",
  sizes: ['40', '41', '42', '43', '44', '45'],
  colors: ['Tan', 'Dark Brown', 'Black', 'Sand'],
  shippingCountry: "Worldwide",
  sellerId: 'seller-1',
  sales: 115,
  badges: ['Limited Stock', 'Trending Product'],
  metaTitle: `Signature Suede Chelsea Boots - Luxury Men's Boots | World Market`,
  metaDescription: `Shop handcrafted Signature Suede Chelsea Boots. Premium materials, timeless style, and exceptional comfort.`,
  metaKeywords: `chelsea boots, suede boots, men's boots, luxury footwear, handcrafted shoes`,
  imageAlt: `Signature Suede Chelsea Boot ${idx + 1}`
}));

export const PRODUCTS: Product[] = [
  ...CLOUDINARY_IMAGES.map((img, idx) => {
    const category = CATEGORIES[idx % CATEGORIES.length];
    return {
      id: `wm-post-${idx}`,
      name: `${category} Premium Item #${idx + 100}`,
      category: category,
      price: 35.00,
      rating: parseFloat((4.5 + Math.random() * 0.5).toFixed(1)),
      stock: 500,
      description: `High-performance professional uniform manufactured by World Market. Durable fabric, moisture-wicking technology, and custom export quality. Designed for elite athletes who demand the best in comfort and performance.`,
      image: img,
      images: [img, ...CLOUDINARY_IMAGES.slice((idx + 1) % CLOUDINARY_IMAGES.length, (idx + 4) % CLOUDINARY_IMAGES.length)],
      datePosted: new Date().toISOString(),
      fabric: "100% Breathable Polyester Mesh",
      quality: idx % 3 === 0 ? 'Export Quality' : (idx % 3 === 1 ? 'Premium' : 'Standard') as any,
      sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
      colors: ['Red', 'Blue', 'Black', 'White', 'Navy'],
      shippingCountry: SHIPPING_COUNTRIES[idx % SHIPPING_COUNTRIES.length],
      sellerId: idx % 2 === 0 ? 'seller-1' : 'seller-2',
      sales: 10 + Math.floor(Math.random() * 100),
      reviews: [
        { id: 'r1', user: 'Mike T.', rating: 5, comment: 'Excellent quality, fits perfectly!', date: '2025-02-15' },
        { id: 'r2', user: 'Sarah K.', rating: 4, comment: 'Good material, but shipping took a bit longer.', date: '2025-02-10' },
        { id: 'r3', user: 'David L.', rating: 5, comment: 'Best uniform we have ever had for our team.', date: '2025-01-28' }
      ]
    };
  }),
  ...NEW_HOODIES,
  ...NEW_TRACKSUITS,
  ...NEW_POLOS,
  ...NEW_SNEAKERS,
  ...NEW_BOOTS
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'blog-1',
    title: 'Why Factory Direct Pricing is Changing the Game',
    slug: 'factory-direct-pricing-benefits',
    excerpt: 'Discover how buying directly from manufacturers saves you up to 70% on premium sportswear.',
    content: 'Buying directly from the source eliminates middlemen, reducing costs significantly while maintaining high quality...',
    category: 'Industry News',
    image: 'https://picsum.photos/seed/industry/800/400',
    date: '2025-02-20',
    author: 'World Market Team',
    tags: ['Factory Direct', 'Savings', 'Ecommerce']
  },
  {
    id: 'blog-2',
    title: 'Top 5 Trends in Global Sportswear for 2025',
    slug: 'sportswear-trends-2025',
    excerpt: 'From sustainable fabrics to smart integration, here is what is trending in the world of sports apparel.',
    content: 'The sportswear industry is evolving rapidly. Sustainability is no longer an option but a requirement...',
    category: 'Trends',
    image: 'https://picsum.photos/seed/trends/800/400',
    date: '2025-02-25',
    author: 'Design Team',
    tags: ['Trends', 'Sportswear', '2025']
  }
];

export const MOCK_SALES = Array.from({ length: 12 }).map((_, i) => ({
  month: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][i],
  sales: 4000 + Math.floor(Math.random() * 8000),
  customers: 120 + Math.floor(Math.random() * 300)
}));

export const MOCK_CUSTOMERS: Customer[] = [
  { id: 'c1', name: 'John Doe', email: 'john@example.com', orderCount: 5, totalSpent: 1250, location: 'New York, USA', lastOrderDate: '2024-12-01' },
  { id: 'c2', name: 'Sarah Smith', email: 'sarah.s@sports.co', orderCount: 12, totalSpent: 4300, location: 'London, UK', lastOrderDate: '2025-01-15' },
  { id: 'c3', name: 'Mike Johnson', email: 'mike@club.org', orderCount: 2, totalSpent: 450, location: 'Berlin, DE', lastOrderDate: '2024-11-20' },
  { id: 'c4', name: 'Elite Academy', email: 'procurement@elite.edu', orderCount: 45, totalSpent: 28900, location: 'Dubai, UAE', lastOrderDate: '2025-02-10' },
];
