export async function checkEnrollmentStatus(userId: number, gameId: number) {
  const response = await fetch(`ColocarAUrlAquiDepois/api/UsersGames/Check?userId=${userId}&gameId=${gameId}`);
  const data = await response.json();
  
  return data.isEnrolled; 
}