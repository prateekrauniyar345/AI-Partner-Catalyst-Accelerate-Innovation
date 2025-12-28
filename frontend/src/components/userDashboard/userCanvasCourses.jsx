import React, { useEffect, useState } from 'react';
import canvasApi from '../../services/canvasApi';
import { Card, Button, Spinner, Accordion } from 'react-bootstrap';

function CourseCard({ course, onExpand, isExpanded, modules, assignments, quizzes, syllabus, isLoading }) {
  return (
    <Card style={{ marginBottom: 16, boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
      <Card.Header
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: isExpanded ? '#f8f9fa' : '#ffffff',
          cursor: 'pointer',
          padding: '16px',
        }}
      >
        <div>
          <div style={{ fontWeight: 700, fontSize: 16 }}>
            {course.name || course.course_name || course.display_name}
          </div>
          <div style={{ fontSize: 12, color: '#666', marginTop: 4 }}>
            ID: {course.canvas_course_id || course.id || 'N/A'}
          </div>
        </div>
        <Button
          variant={isExpanded ? 'primary' : 'outline-primary'}
          size="sm"
          onClick={() => onExpand(course)}
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
                style={{ marginRight: 6 }}
              />
              Loading...
            </>
          ) : isExpanded ? (
            'Hide'
          ) : (
            'View'
          )}
        </Button>
      </Card.Header>

      {isExpanded && (
        <Card.Body style={{ backgroundColor: '#fafbfc', borderTop: '1px solid #e9ecef' }}>
          {isLoading ? (
            <div className="text-center py-5">
              <Spinner animation="border" role="status" className="mb-3" />
              <div>Loading course details...</div>
            </div>
          ) : (
            <>
              {/* Course Syllabus */}
              {syllabus && (
                <div className="mb-4">
                  <h6 className="fw-bold mb-2">Course Syllabus</h6>
                  <Accordion defaultActiveKey={null} className="mb-3">
                    <Accordion.Item eventKey="syllabus" key="syllabus">
                      <Accordion.Header>
                        <strong>📖 View Course Syllabus</strong>
                      </Accordion.Header>
                      <Accordion.Body style={{ fontSize: 13 }}>
                        <div
                          style={{
                            color: '#333',
                          }}
                          dangerouslySetInnerHTML={{ __html: syllabus }}
                        />
                      </Accordion.Body>
                    </Accordion.Item>
                  </Accordion>
                </div>
              )}

              {/* Modules */}
              <div className="mb-4">
                <h6 className="fw-bold mb-2">Modules ({modules?.length || 0})</h6>
                {modules && modules.length > 0 ? (
                  <Accordion defaultActiveKey={null} className="mb-3">
                    {modules.map((m) => (
                      <Accordion.Item eventKey={`module-${m.id || m.canvas_module_id}`} key={m.id || m.canvas_module_id}>
                        <Accordion.Header>{m.name}</Accordion.Header>
                        <Accordion.Body style={{ fontSize: 13 }}>
                          <div className="mb-2">
                            <strong>Position:</strong> {m.position}
                          </div>
                          {m.description && (
                            <div
                              className="mb-2"
                              dangerouslySetInnerHTML={{ __html: m.description }}
                            />
                          )}
                          <div style={{ color: '#666', fontSize: 12 }}>
                            {m.items_count || 0} items
                          </div>
                        </Accordion.Body>
                      </Accordion.Item>
                    ))}
                  </Accordion>
                ) : (
                  <div style={{ fontSize: 13, color: '#999' }}>No modules found</div>
                )}
              </div>

              {/* Assignments */}
              <div className="mb-4">
                <h6 className="fw-bold mb-2">Assignments ({assignments?.length || 0})</h6>
                {assignments && assignments.length > 0 ? (
                  <Accordion defaultActiveKey={null} className="mb-3">
                    {assignments.map((a) => (
                      <Accordion.Item eventKey={`assignment-${a.id || a.canvas_assignment_id}`} key={a.id || a.canvas_assignment_id}>
                        <Accordion.Header>
                          <div>
                            <strong>{a.name}</strong>
                            <div style={{ fontSize: 11, color: '#999', marginTop: 2 }}>
                              Due: {a.due_at ? new Date(a.due_at).toLocaleDateString() : 'No due date'}
                            </div>
                          </div>
                        </Accordion.Header>
                        <Accordion.Body style={{ fontSize: 13 }}>
                          {a.description ? (
                            <div
                              className="mb-2"
                              dangerouslySetInnerHTML={{ __html: a.description }}
                            />
                          ) : (
                            <div style={{ color: '#999' }}>No description</div>
                          )}
                          {a.submission_types && (
                            <div className="mt-3 pt-2 border-top">
                              <strong style={{ fontSize: 12 }}>Submission Type:</strong>
                              <div style={{ fontSize: 12, color: '#666' }}>
                                {Array.isArray(a.submission_types)
                                  ? a.submission_types.join(', ')
                                  : a.submission_types}
                              </div>
                            </div>
                          )}
                          {a.points_possible && (
                            <div className="mt-2">
                              <strong style={{ fontSize: 12 }}>Points:</strong>
                              <div style={{ fontSize: 12, color: '#666' }}>{a.points_possible}</div>
                            </div>
                          )}
                        </Accordion.Body>
                      </Accordion.Item>
                    ))}
                  </Accordion>
                ) : (
                  <div style={{ fontSize: 13, color: '#999' }}>No assignments</div>
                )}
              </div>

              {/* Quizzes */}
              <div className="mb-4">
                <h6 className="fw-bold mb-2">Quizzes ({quizzes?.length || 0})</h6>
                {quizzes && quizzes.length > 0 ? (
                  <Accordion defaultActiveKey={null} className="mb-3">
                    {quizzes.map((q) => (
                      <Accordion.Item eventKey={`quiz-${q.id || q.canvas_quiz_id}`} key={q.id || q.canvas_quiz_id}>
                        <Accordion.Header>
                          <div>
                            <strong>{q.title}</strong>
                            <div style={{ fontSize: 11, color: '#999', marginTop: 2 }}>
                              {q.question_count || 0} questions
                            </div>
                          </div>
                        </Accordion.Header>
                        <Accordion.Body style={{ fontSize: 13 }}>
                          {q.description ? (
                            <div
                              className="mb-2"
                              dangerouslySetInnerHTML={{ __html: q.description }}
                            />
                          ) : (
                            <div style={{ color: '#999' }}>No description</div>
                          )}
                          {q.quiz_type && (
                            <div className="mt-3 pt-2 border-top">
                              <strong style={{ fontSize: 12 }}>Quiz Type:</strong>
                              <div style={{ fontSize: 12, color: '#666' }}>{q.quiz_type}</div>
                            </div>
                          )}
                          {q.points_possible && (
                            <div className="mt-2">
                              <strong style={{ fontSize: 12 }}>Points Possible:</strong>
                              <div style={{ fontSize: 12, color: '#666' }}>{q.points_possible}</div>
                            </div>
                          )}
                          {q.time_limit && (
                            <div className="mt-2">
                              <strong style={{ fontSize: 12 }}>Time Limit:</strong>
                              <div style={{ fontSize: 12, color: '#666' }}>{q.time_limit} minutes</div>
                            </div>
                          )}
                        </Accordion.Body>
                      </Accordion.Item>
                    ))}
                  </Accordion>
                ) : (
                  <div style={{ fontSize: 13, color: '#999' }}>No quizzes</div>
                )}
              </div>
            </>
          )}
        </Card.Body>
      )}
    </Card>
  );
}

export default function UserCanvasCourses() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const [courses, setCourses] = useState([]);
  const [expandedCourseId, setExpandedCourseId] = useState(null);
  const [courseDetails, setCourseDetails] = useState({}); // { courseId: { modules, assignments, quizzes } }
  const [loadingCourseId, setLoadingCourseId] = useState(null);

  //   console.log("courses loaded:", courses);  
  //   state for sylabus
  const [syllabus, setSyllabus] = useState({});

  useEffect(()=>{
    async function getCourseSyllabus(){
        try{
            for (const course of courses){
                const syllabusData = await canvasApi.getCourse(course.canvas_course_id);
                setSyllabus((prev) => ({
                    ...prev,
                    [course.canvas_course_id]: syllabusData.syllabus_body || 'No syllabus available',
                }));
            }
        }catch(e){
            console.error("Error fetching syllabus:", e);
        }
    }
    getCourseSyllabus();
  }, [ courses ]); 



  //  console.log("sylabus are : ", syllabus);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        setLoading(true);
        const info = await canvasApi.getUserInformation();
        if (!mounted) return;
        setUser(info);
        const data = await canvasApi.getCourses();
        if (!mounted) return;
        setCourses(data || []);
      } catch (e) {
        setError(String(e));
      } finally {
        setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  async function expandCourse(course) {
    const courseId = course.id || course.canvas_course_id;
    const isAlreadyExpanded = expandedCourseId === courseId;

    if (isAlreadyExpanded) {
      // Collapse if already expanded
      setExpandedCourseId(null);
      return;
    }

    // Expand and fetch details if not already loaded
    setExpandedCourseId(courseId);

    if (!courseDetails[courseId]) {
      setLoadingCourseId(courseId);
      try {
        const [modules, assignments, quizzes] = await Promise.all([
          canvasApi.getCourseModules(courseId),
          canvasApi.getCourseAssignments(courseId),
          canvasApi.getCourseQuizzes(courseId),
        ]);

        setCourseDetails((prev) => ({
          ...prev,
          [courseId]: {
            modules: modules || [],
            assignments: assignments || [],
            quizzes: quizzes || [],
          },
        }));
      } catch (e) {
        setError(String(e));
      } finally {
        setLoadingCourseId(null);
      }
    }
  }

  return (
    <div style={{ maxWidth: '100%' }}>
      <h3 style={{ marginBottom: 24 }}>📚 My Canvas Courses</h3>

      {error && (
        <div
          style={{
            padding: 12,
            backgroundColor: '#f8d7da',
            color: '#721c24',
            borderRadius: 6,
            marginBottom: 16,
            border: '1px solid #f5c6cb',
          }}
        >
          Error: {error}
        </div>
      )}

      {loading ? (
        <div className="text-center py-5">
          <Spinner animation="border" role="status" className="mb-3" />
          <div style={{ fontSize: 14, color: '#666' }}>Loading your courses...</div>
        </div>
      ) : !courses?.length ? (
        <div
          style={{
            padding: 24,
            backgroundColor: '#e7f3ff',
            color: '#0066cc',
            borderRadius: 6,
            textAlign: 'center',
            border: '1px solid #b3d9ff',
          }}
        >
          No courses found. Enroll in a Canvas course to get started!
        </div>
      ) : (
        <div>
          {courses.map((c) => (
            <CourseCard
              key={c.id || c.canvas_course_id}
              course={c}
              onExpand={expandCourse}
              isExpanded={expandedCourseId === (c.id || c.canvas_course_id)}
              modules={courseDetails[c.id || c.canvas_course_id]?.modules}
              assignments={courseDetails[c.id || c.canvas_course_id]?.assignments}
              quizzes={courseDetails[c.id || c.canvas_course_id]?.quizzes}
              syllabus={syllabus[c.canvas_course_id]}
              isLoading={loadingCourseId === (c.id || c.canvas_course_id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
