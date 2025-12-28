const API_PREFIX = '/canvas';

async function request(path, opts = {}) {
  const res = await fetch(path, opts);
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || res.statusText);
  }
  return res.json();
}

/**
 * Get current user information from Canvas API
 * @returns {Promise<Object>} User object with id, name, email, etc.
 */
export async function getUserInformation() {
  return request(`${API_PREFIX}/user/information`);
}

/**
 * Get all courses for the current user
 * @returns {Promise<Array>} Array of course objects
 */
export async function getCourses() {
  return request(`${API_PREFIX}/courses`);
}

/**
 * Get a single course with full details (including syllabus)
 * @param {number} course_id - Canvas course ID
 * @returns {Promise<Object>} Course object with syllabus
 */
export async function getCourse(course_id) {
  return request(`${API_PREFIX}/courses/${course_id}`);
}

/**
 * Get all modules for a course
 * @param {number} course_id - Canvas course ID
 * @returns {Promise<Array>} Array of module objects
 */
export async function getCourseModules(course_id) {
  return request(`${API_PREFIX}/courses/${course_id}/modules`);
}

/**
 * Get all items within a module
 * @param {number} module_id - Canvas module ID
 * @returns {Promise<Array>} Array of module item objects
 */
export async function getModuleItems(module_id) {
  return request(`${API_PREFIX}/modules/${module_id}/items`);
}

/**
 * Get all assignments for a course
 * @param {number} course_id - Canvas course ID
 * @returns {Promise<Array>} Array of assignment objects
 */
export async function getCourseAssignments(course_id) {
  return request(`${API_PREFIX}/courses/${course_id}/assignments`);
}

/**
 * Get a single assignment
 * @param {number} course_id - Canvas course ID
 * @param {number} assignment_id - Canvas assignment ID
 * @returns {Promise<Object>} Assignment object
 */
export async function getAssignment(course_id, assignment_id) {
  return request(`${API_PREFIX}/courses/${course_id}/assignments/${assignment_id}`);
}

/**
 * Get all quizzes for a course
 * @param {number} course_id - Canvas course ID
 * @returns {Promise<Array>} Array of quiz objects
 */
export async function getCourseQuizzes(course_id) {
  return request(`${API_PREFIX}/courses/${course_id}/quizzes`);
}

/**
 * Get a single quiz
 * @param {number} course_id - Canvas course ID
 * @param {number} quiz_id - Canvas quiz ID
 * @returns {Promise<Object>} Quiz object
 */
export async function getQuiz(course_id, quiz_id) {
  return request(`${API_PREFIX}/courses/${course_id}/quizzes/${quiz_id}`);
}

/**
 * Get all files in a course
 * @param {number} course_id - Canvas course ID
 * @returns {Promise<Array>} Array of file objects
 */
export async function getCourseFiles(course_id) {
  return request(`${API_PREFIX}/courses/${course_id}/files`);
}

/**
 * Get all pages in a course
 * @param {number} course_id - Canvas course ID
 * @returns {Promise<Array>} Array of page objects
 */
export async function getCoursePages(course_id) {
  return request(`${API_PREFIX}/courses/${course_id}/pages`);
}

export default {
  getUserInformation,
  getCourses,
  getCourse,
  getCourseModules,
  getModuleItems,
  getCourseAssignments,
  getAssignment,
  getCourseQuizzes,
  getQuiz,
  getCourseFiles,
  getCoursePages,
};
