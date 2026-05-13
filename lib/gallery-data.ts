export interface GalleryImage {
  id: string;
  url: string;
  alt: string;
}

// You can replace these with your actual Cloudinary URLs.
// I've added a few placeholder images so you can see the layout working.
export const galleryImages: GalleryImage[] = Array.from({ length: 80 }).map((_, index) => {
  // Use a mix of local placeholders for demonstration
  const placeholderImages = [
    "https://res.cloudinary.com/dt193a7ok/image/upload/q_auto/f_auto/v1778387668/20260425_111503_iruj7y.jpg",
    "https://res.cloudinary.com/dt193a7ok/image/upload/q_auto/f_auto/v1778387667/20260425_114314_lphv25.jpg",
    "https://res.cloudinary.com/dt193a7ok/image/upload/q_auto/f_auto/v1778387667/20260425_114314_lphv25.jpg",
    "https://res.cloudinary.com/dt193a7ok/image/upload/q_auto/f_auto/v1778387661/20260425_110423_qgnohn.jpg",
    "https://res.cloudinary.com/dt193a7ok/image/upload/q_auto/f_auto/v1778387658/20260425_114310_ratyhk.jpg",
    "https://res.cloudinary.com/dt193a7ok/image/upload/q_auto/f_auto/v1778387658/20260425_111641_d355cw.jpg",
    "https://res.cloudinary.com/dt193a7ok/image/upload/q_auto/f_auto/v1778387657/20260425_111626_k6buev.jpg",
    "https://res.cloudinary.com/dt193a7ok/image/upload/q_auto/f_auto/v1778387652/20260425_111633_nkkxtf.jpg",
    "https://res.cloudinary.com/dt193a7ok/image/upload/q_auto/f_auto/v1778387651/20260425_114119_bcnft7.jpg",
    "https://res.cloudinary.com/dt193a7ok/image/upload/q_auto/f_auto/v1778387648/20260425_113520_heoscd.jpg",
    "https://res.cloudinary.com/dt193a7ok/image/upload/q_auto/f_auto/v1778387647/20260425_110113_pjusqf.jpg",
    "https://res.cloudinary.com/dt193a7ok/image/upload/q_auto/f_auto/v1778387645/20260425_110251_salkhw.jpg",
    "https://res.cloudinary.com/dt193a7ok/image/upload/q_auto/f_auto/v1778387644/20260425_111442_uwg4nf.jpg",
    "https://res.cloudinary.com/dt193a7ok/image/upload/q_auto/f_auto/v1778387642/20260425_105608_zyzwhg.jpg",
    "https://res.cloudinary.com/dt193a7ok/image/upload/q_auto/f_auto/v1778387642/20260425_113044_swpgaa.jpg",
    "https://res.cloudinary.com/dt193a7ok/image/upload/q_auto/f_auto/v1778387639/20260425_114511_wdn3lx.jpg",
    "https://res.cloudinary.com/dt193a7ok/image/upload/q_auto/f_auto/v1778387639/20260425_111424_grau4s.jpg",
    "https://res.cloudinary.com/dt193a7ok/image/upload/q_auto/f_auto/v1778387636/20260425_111116_hbcyoq.jpg",
    "https://res.cloudinary.com/dt193a7ok/image/upload/q_auto/f_auto/v1778387635/20260425_105906_hqcdrd.jpg",
    "https://res.cloudinary.com/dt193a7ok/image/upload/q_auto/f_auto/v1778387634/20260425_110051_mlmerm.jpg",
    "https://res.cloudinary.com/dt193a7ok/image/upload/q_auto/f_auto/v1778387632/20260425_114329_sutueq.jpg",
    "https://res.cloudinary.com/dt193a7ok/image/upload/q_auto/f_auto/v1778387630/20260425_113049_kiwovy.jpg",
    "https://res.cloudinary.com/dt193a7ok/image/upload/q_auto/f_auto/v1778387630/20260425_110656_rj1nfv.jpg",
    "https://res.cloudinary.com/dt193a7ok/image/upload/q_auto/f_auto/v1778387628/20260425_112438_al92ko.jpg",
    "https://res.cloudinary.com/dt193a7ok/image/upload/q_auto/f_auto/v1778387628/20260425_094323_efeokg.jpg",
    "https://res.cloudinary.com/dt193a7ok/image/upload/q_auto/f_auto/v1778387626/20260425_114255_svmfxq.jpg",
    "https://res.cloudinary.com/dt193a7ok/image/upload/q_auto/f_auto/v1778387625/20260425_110634_mkbdq8.jpg",
    "https://res.cloudinary.com/dt193a7ok/image/upload/q_auto/f_auto/v1778387621/20260425_111906_ivqybw.jpg",
    "https://res.cloudinary.com/dt193a7ok/image/upload/q_auto/f_auto/v1778387621/20260425_094309_us5qwy.jpg",
    "https://res.cloudinary.com/dt193a7ok/image/upload/q_auto/f_auto/v1778387619/20260425_111529_amwmgn.jpg",
    "https://res.cloudinary.com/dt193a7ok/image/upload/q_auto/f_auto/v1778387619/20260425_110852_i3rauw.jpg",
    "https://res.cloudinary.com/dt193a7ok/image/upload/q_auto/f_auto/v1778387616/20260425_111700_srwbxd.jpg",
    "https://res.cloudinary.com/dt193a7ok/image/upload/q_auto/f_auto/v1778387614/20260425_110413_as4nds.jpg",
    "https://res.cloudinary.com/dt193a7ok/image/upload/q_auto/f_auto/v1778387613/20260425_111207_lfuuhc.jpg",
    "https://res.cloudinary.com/dt193a7ok/image/upload/q_auto/f_auto/v1778387612/20260425_110329_hxybys.jpg",
    "https://res.cloudinary.com/dt193a7ok/image/upload/q_auto/f_auto/v1778387611/20260425_094401_xu9x4a.jpg",
    "https://res.cloudinary.com/dt193a7ok/image/upload/q_auto/f_auto/v1778387610/20260425_110955_c5uxue.jpg",
    "https://res.cloudinary.com/dt193a7ok/image/upload/q_auto/f_auto/v1778387607/20260425_111623_g6wnab.jpg",
    "https://res.cloudinary.com/dt193a7ok/image/upload/q_auto/f_auto/v1778387605/20260425_094152_okojca.jpg",
    "https://res.cloudinary.com/dt193a7ok/image/upload/q_auto/f_auto/v1778387605/20260425_111201_iw7qyx.jpg",
    "https://res.cloudinary.com/dt193a7ok/image/upload/q_auto/f_auto/v1778387605/20260425_114400_hlswsj.jpg",
    "https://res.cloudinary.com/dt193a7ok/image/upload/q_auto/f_auto/v1778387604/20260425_111653_qluhhk.jpg",
    "https://res.cloudinary.com/dt193a7ok/image/upload/q_auto/f_auto/v1778387603/20260425_094114_ebsgkm.jpg",
    "https://res.cloudinary.com/dt193a7ok/image/upload/q_auto/f_auto/v1778387603/20260425_113916_tucn3n.jpg",
    "https://res.cloudinary.com/dt193a7ok/image/upload/q_auto/f_auto/v1778387600/20260425_110011_kizzbj.jpg",
    "https://res.cloudinary.com/dt193a7ok/image/upload/q_auto/f_auto/v1778387598/20260425_105808_wd2nxk.jpg",
    "https://res.cloudinary.com/dt193a7ok/image/upload/q_auto/f_auto/v1778387597/20260425_112812_yq6jbt.jpg",
    "https://res.cloudinary.com/dt193a7ok/image/upload/q_auto/f_auto/v1778387596/20260425_110344_lv7xc1.jpg",
    "https://res.cloudinary.com/dt193a7ok/image/upload/q_auto/f_auto/v1778387595/20260425_111055_u3bwbz.jpg",
    "https://res.cloudinary.com/dt193a7ok/image/upload/q_auto/f_auto/v1778387595/20260425_111736_q5kcwz.jpg",
    "https://res.cloudinary.com/dt193a7ok/image/upload/q_auto/f_auto/v1778387593/20260425_113106_v7ygfs.jpg",
    "https://res.cloudinary.com/dt193a7ok/image/upload/q_auto/f_auto/v1778387588/20260425_110834_kfrxie.jpg",
    "https://res.cloudinary.com/dt193a7ok/image/upload/q_auto/f_auto/v1778387589/20260425_112104_rfsxdh.jpg",
    "https://res.cloudinary.com/dt193a7ok/image/upload/q_auto/f_auto/v1778387587/20260425_111013_vd94cj.jpg",
    "https://res.cloudinary.com/dt193a7ok/image/upload/q_auto/f_auto/v1778387586/20260425_111759_yylq90.jpg",
    "https://res.cloudinary.com/dt193a7ok/image/upload/q_auto/f_auto/v1778387582/20260425_112443_w0xmw3.jpg",
    "https://res.cloudinary.com/dt193a7ok/image/upload/q_auto/f_auto/v1778387582/20260425_112532_hcsjdz.jpg",
    "https://res.cloudinary.com/dt193a7ok/image/upload/q_auto/f_auto/v1778387580/20260425_111647_ibg7mf.jpg",
    "https://res.cloudinary.com/dt193a7ok/image/upload/q_auto/f_auto/v1778387577/20260425_111711_k0lek4.jpg",
    "https://res.cloudinary.com/dt193a7ok/image/upload/q_auto/f_auto/v1778387576/20260425_110921_qzz52i.jpg",
    "https://res.cloudinary.com/dt193a7ok/image/upload/q_auto/f_auto/v1778387574/20260425_111404_wcm4b7.jpg",
    "https://res.cloudinary.com/dt193a7ok/image/upload/q_auto/f_auto/v1778387572/20260425_113031_rijhwz.jpg",
  ];
  const url = placeholderImages[index % placeholderImages.length];

  return {
    id: `img-${index + 1}`,
    url: url, // Replace with Cloudinary URL
    alt: `Temple Construction Image ${index + 1}`,
  };
});
